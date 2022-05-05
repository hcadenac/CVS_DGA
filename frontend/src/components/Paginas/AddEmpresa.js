import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Card, Col, Container, Form, Row, Modal } from 'react-bootstrap'

const AddEmpresa = () => {

    /*estados para las validaciones de los formularios*/
	const { register, handleSubmit, formState: { errors } } = useForm();

	//const [list, setList] = useState([{}]);
	const [nit, setNit] = useState('')
	const [ciuu, setCiuu] = useState('')
	const [camara, setCamara] = useState('')
	const [razon_social, setRazon_social] = useState('')
	const [municipio, setMunicipio] = useState('')
	const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
	const [web, setWeb] = useState('')
    const [cedula, setCedula] = useState('')
    const [nombre_rep, setNombre_rep] = useState('')
    const [tipo_empresa, setTipo_empresa] = useState('')
	const [sector_prod, setSector_prod] = useState('')
	const [fecha_reg, setFecha_reg] = useState('')
	const [fecha_dga, setFecha_dga] = useState('')
	const [nombre_dga, setNombre_dga] = useState('')
	const [nivel_estudio, setNivel_estudio] = useState('')
	const [titulo, setTitulo] = useState('')
	const [cargo, setCargo] = useState('')
	const [tipo_dga, setTipo_dga] = useState('')
	const [email_dga, setEmail_dga] = useState('')
	const [fecha_regdga, setFecha_regdga] = useState('')
	
	const [lista, setLista] = useState([])
    const [show, setShow] = useState(false);
	const [mensaje, setMensaje] = useState('');
	const [color, setColor] = useState('');
	const navigate = useNavigate();

    const getLista = async () => {
		try {
			const response = await axios.get('/municipios/')
            console.log(response)
			const { data } = response
			setLista(data)
		} catch (err) {
			console.log(err)
		}
	} 
    useEffect(() => {
		getLista()
	}, [])

	
	const onSubmit = (data) => {
		AddTodoHandler();
	  };

	/* Cierra el dialogo Modal */
	const handleClose = () => {
    	setShow(false);
	}

	/* Adiciona un registro a la base de datos */
	const AddTodoHandler = async (e) => {
		//e.preventDefault()
		const addEmpresa = ({
			nit,
			ciuu,
			camara,
			razon_social,
			municipio,
			direccion,
            telefono,
            correo,
			web,
            cedula,
            nombre_rep,
            tipo_empresa,
			sector_prod,
			fecha_reg,
			fecha_dga,
			nombre_dga,
			nivel_estudio,
			titulo,
			cargo,
			tipo_dga,
			email_dga,
			fecha_regdga

		})
		console.log(addEmpresa)
		try{
			const respuesta = await axios.post('/empresas/', addEmpresa)
			const { status } = respuesta
			//console.log(respuesta)
			if (status === 201){
				setColor('success')
				setMensaje('..LA INFORMACION SE REGISTRO SATISFACTORIAMENTE..')
			setShow(true)
			}
			
		}catch (err) {
			console.log(err)
			setColor('danger')
			setMensaje("!!NO FUE POSIBLE REGISTRAR LOS DATOS!! - : "+err)
			setShow(true)
		}
		//window.location.reload();
		//window.location.href="/municipios/";
	}
	
	/*formulario para ingresar datos a grabar en la base de datos*/
    return (
		
		<div className='wrapper'>
			
		<Container>
			<Row className='justify-content-center pt-5'>
				<Col>
					<Card className='p-5'>	
					{/* <h3 align="center">Registrar Departamento de Gestion Ambiental </h3> */}
					<h4>Informacion de la Empresa</h4>
					<hr ></hr>
                    <Form onSubmit={handleSubmit(onSubmit)} >
					<Row className="mb-3"> 
						<Form.Group as={Col} controlId="formGridNIT">
						<Form.Label>NIT</Form.Label>
						<Form.Control type='text' placeholder='' name ='nit' {...register('nit',{required: true})} value ={nit} onChange={e => setNit(e.target.value)} />
						{errors.nit && <p id="text-error">El valor del NIT es requerido</p>}
                        </Form.Group>

                        <Form.Group as={Col} ontrolId="formGridCIUU">
						<Form.Label>CIUU</Form.Label>
						<Form.Control type='text' placeholder='' name ='ciuu' value ={ciuu} onChange={e => setCiuu(e.target.value)} />
						</Form.Group>

						<Form.Group as={Col} ontrolId="formGridCamara">
						<Form.Label>CAMARA</Form.Label>
						<Form.Control type='text' placeholder='' name ='camara' value ={camara} onChange={e => setCamara(e.target.value)} />
						</Form.Group>
					</Row>
					
						<Form.Group controlId='formGridRazonSocial'>
						<Form.Label>RAZON SOCIAL</Form.Label>
						<Form.Control type='text' placeholder='' name ='nombre' {...register('nombre',{required: true})}  value ={razon_social} onChange={e => setRazon_social(e.target.value)} />
						{errors.nombre && <p id="text-error">El valor RAZON SOCIAL es requerido</p>}
                        </Form.Group>

					<Row className="mb-3"> 
                        <Form.Group as={Col} ontrolId="formGridMpio">
						<Form.Label>MUNICIPIO</Form.Label>
						<Form.Select aria-label="" name ='vocacion' value ={municipio} onChange={e => setMunicipio(e.target.value)} >
						<option>Seleccione el Municipio</option>
						{lista.map((fila, index) =>( 
							<option key={index} value={fila.codigo_mpio}>{fila.nombre_mpio}</option>
						))}
						</Form.Select>
                        </Form.Group>

						<Form.Group as={Col} controlId='formGridDireccion'>
						<Form.Label>DIRECCION</Form.Label>
						<Form.Control type='text' placeholder='' name ='direccion' {...register('direccion',{required: true})}  value = {direccion} onChange={e => setDireccion(e.target.value)} />
						{errors.direccion && <p id="text-error">El valor del Direccion es requerido</p>}
                        </Form.Group>

						<Form.Group as={Col} controlId='formGridTelefono'>
						<Form.Label>TELEFONO</Form.Label>
						<Form.Control type='text' placeholder='' name ='telefono' value ={telefono} onChange={e => setTelefono(e.target.value)} />
                        </Form.Group>
					</Row>
					<Row className="mb-2"> 
                        <Form.Group as={Col} controlId='formGridTMail'>
						<Form.Label>EMAIL</Form.Label>
						<Form.Control type='email' placeholder='' name ='email'{...register('email',{required: true})}   value ={correo} onChange={e => setCorreo(e.target.value)} />
						{errors.email && <p id="text-error">El valor del Correo es requerido</p>}
                        </Form.Group>

						<Form.Group as={Col}  controlId='formGridTWeb'>
						<Form.Label>PAGINA WEB</Form.Label>
						<Form.Control type='text' placeholder='' name ='web' value ={web} onChange={e => setWeb(e.target.value)} />
						</Form.Group>
					</Row>
					<Row className="mb-2"> 
                        <Form.Group as={Col} controlId='formGridCedula'>
						<Form.Label>CEDULA</Form.Label>
						<Form.Control type='text' placeholder='' name ='cedula' {...register('cedula',{required: true})}  value ={cedula} onChange={e => setCedula(e.target.value)} />
						{errors.cedula && <p id="text-error">El valor de cedula es requerido</p>}
                        </Form.Group>
                        <Form.Group as={Col} controlId='formGridnombreRep'>
						<Form.Label>NOMBRE REPRESENTANTE</Form.Label>
						<Form.Control type='text' placeholder='' name ='nombre_rep' {...register('nombre_rep',{required: true})} value ={nombre_rep} onChange={e => setNombre_rep(e.target.value)} />
						{errors.nombre_rep && <p id="text-error">El nombre del representante es requerido</p>}
                        </Form.Group>
					</Row>
					<Row className="mb-2"> 
                        <Form.Group as={Col} controlId='description'>
						<Form.Label>SU EMPRESA ES:</Form.Label>
                        <Form.Select aria-label="" name ='vocacion' value ={tipo_empresa} onChange={e => setTipo_empresa(e.target.value)} >
							<option>Seleccione Tipo Empresa</option>
							<option value="PEQUEÑA">PEQUEÑA</option>
                            <option value="MEDIANA">MEDIANA</option>
                            <option value="GRANDE">GRANDE</option>
                        </Form.Select>
						</Form.Group>
						<Form.Group as={Col} controlId='formGridnombreRep'>
						<Form.Label>SECTOR PRODUCTIVO</Form.Label>
						<Form.Control type='text' placeholder='' name ='sector' value ={sector_prod} onChange={e => setSector_prod(e.target.value)} />
						</Form.Group>					
					</Row>
					<Row className="mb-2"> 
                        <Form.Group as={Col} controlId='formGridCedula'>
						<Form.Label>FECHA REGISTRO EMPRESA</Form.Label>
						<Form.Control type='date' placeholder='' name ='fechaReg' value ={fecha_reg} onChange={e => setFecha_reg(e.target.value)} />
						</Form.Group>
                        <Form.Group as={Col} controlId='formGridnombreRep'>
						<Form.Label>FECHA CREACION DGA</Form.Label>
						<Form.Control type='date' placeholder='' name ='fecgaDga' value ={fecha_dga} onChange={e => setFecha_dga(e.target.value)} />
						</Form.Group>
					</Row>
					<br></br>
					<h4 >Informacion Departamento de Gestion Ambiental</h4>
					<hr></hr>
					<Row className="mb-2"> 
                        <Form.Group as={Col} controlId='formGridCedula'>
						<Form.Label>RESPONSABLE DGA</Form.Label>
						<Form.Control type='text' placeholder='' name ='nombre_dga' {...register('nombre_dga',{required: true})} value ={nombre_dga} onChange={e => setNombre_dga(e.target.value)} />
						{errors.nombre_dga && <p id="text-error">El nombre del responsable DGA es requerido</p>}
                        </Form.Group>
                        <Form.Group as={Col} controlId='formGridnombreRep'>
						<Form.Label>NIVEL ESTUDIO</Form.Label>
						{/* <Form.Control type='text' placeholder='' name ='nivelestudio' value ={nivel_estudio} onChange={e => setNivel_estudio(e.target.value)} /> */}
						<Form.Select aria-label="" name ='nivelestudio' value ={nivel_estudio} onChange={e => setNivel_estudio(e.target.value)} >
							<option>Seleccione Nivel Estudio</option>
							<option value="TECNICO">TECNICO</option>
                            <option value="TECNOLOGO">TECNOLOGO</option>
                            <option value="PROFESIONAL">PROFESIONAL</option>
                        </Form.Select>
                        </Form.Group>
					</Row>
					<Row className="mb-3"> 
                        <Form.Group as={Col} controlId='formGridCedula'>
						<Form.Label>TITULO</Form.Label>
						<Form.Control type='text' placeholder='' name ='titulo' value ={titulo} onChange={e => setTitulo(e.target.value)} />
						</Form.Group>
                        <Form.Group as={Col} controlId='formGridnombreRep'>
						<Form.Label>CARGO</Form.Label>
						<Form.Control type='text' placeholder='' name ='cargo'  {...register('cargo',{required: true})} value ={cargo} onChange={e => setCargo(e.target.value)} />
						{errors.cargo && <p id="text-error">El cargo del responsable DGA es requerido</p>}
						</Form.Group>
						<Form.Group as={Col} controlId='formGridnombreRep'>
						<Form.Label>TIPO DGA</Form.Label>
						{/* <Form.Control type='text' placeholder='' name ='tipo_dga' value ={tipo_dga} onChange={e => setTipo_dga(e.target.value)} /> */}
						<Form.Select aria-label="" name ='tipo_dga' value ={tipo_dga} onChange={e => setTipo_dga(e.target.value)} >
							<option>Seleccione Tipo DGA</option>
							<option value="INTERNO">INTERNO</option>
                            <option value="EXTERNO">EXTERNO</option>
                            <option value="APOYO">APOYO GREMIO</option>
                        </Form.Select>
						</Form.Group>
					</Row>
					<Row className="mb-2"> 
                        <Form.Group as={Col} controlId='formGridCedula'>
						<Form.Label>EMAIL DGA</Form.Label>
						<Form.Control type='email' placeholder='' name ='emailDga' value ={email_dga} onChange={e => setEmail_dga(e.target.value)} />
						</Form.Group>
                        <Form.Group as={Col} controlId='formGridnombreRep'>
						<Form.Label>FECHA REGISTRO DGA</Form.Label>
						<Form.Control type='date' placeholder='' name ='fecha_regdga' value ={fecha_regdga} onChange={e => setFecha_regdga(e.target.value)} />
						</Form.Group>
					</Row>
						<br/>
						<Button variant='primary' type='submit' >Adicionar Empresa</Button>{"   "}
						<Button variant='danger' type='submit' onClick={() => navigate('/GestionEmpresa')}>Cancelar</Button>
						<br/>
					</Form>
					</Card>
				</Col>
			</Row>
		</Container>

		{/* ///formulario Modal para mostrar dialogo de verificacion de registro de datos/// */}
		<Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Adicionar Registro</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
				{mensaje}
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant={color} onClick={handleClose}>Aceptar</Button>
	        </Modal.Footer>
	      </Modal>
		</div>
    );
}

export default AddEmpresa