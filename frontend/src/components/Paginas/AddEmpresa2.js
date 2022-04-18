import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Button, Card, Col, Container, Form, Row, Modal } from 'react-bootstrap'

const AddEmpresa = () => {


	/*estados para las validaciones de los formularios*/
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
    

	/* estados para guardar los valores de los campos del formulario*/
	const [lista, setLista] = useState([])
	const [nit, setNit] = useState('')
	const [municipio, setMunicipio] = useState('')
	const [razon_social, setRazon_social] = useState('')
	const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [cedula, setCedula] = useState('')
    const [nombre_rep, setNombre_rep] = useState('')
    const [tipo_empresa, setTipo_empresa] = useState('')

	/* estados para mensajs y colores del formulario Modal*/
	const [show, setShow] = useState(false);
	const [mensaje, setMensaje] = useState('');
	const [color, setColor] = useState('');

	/* lista con los municipios para cargar en el select */
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

	/* Cierra el dialogo Modal */
	const handleClose = () => {
    	setShow(false);
	}

	const onSubmit = (data) => {
		AddTodoHandler();
	  };

	/* Adiciona un registro a la base de datos */
	const AddTodoHandler = async (e) => {
		//e.preventDefault()
		const addEmpresa = ({
			nit,
			municipio,
			razon_social,
			direccion,
            telefono,
            correo,
            cedula,
            nombre_rep,
            tipo_empresa,
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
			setMensaje("!!NO FUE POSIBLE REGISTRAR LOS  DATOS!! - : "+err)
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
					<h3 align="center">Registrar Empresa</h3>
					<Form onSubmit={handleSubmit(onSubmit)} >
						<Form.Group controlId='title'>
						<Form.Label>NIT</Form.Label>
						<Form.Control type='text' placeholder='Ingrese el NIT' name ='nit' {...register('nit',{required: true})} value ={nit} onChange={e => setNit(e.target.value)} />
						{errors.nit && <p id="text-error">El valor del NIT es requerido</p>}
						</Form.Group>
								
                        <Form.Group controlId='title'>
						<Form.Label>MUNICIPIO</Form.Label>
						<Form.Select aria-label="" name ='vocacion' value ={municipio} onChange={e => setMunicipio(e.target.value)} >
						<option>Seleccione el Municipio</option>
						{lista.map((fila, index) =>( 
							<option key={index} value={fila.codigo_mpio}>{fila.nombre_mpio}</option>
						))}
                        </Form.Select>
						</Form.Group>

						<Form.Group controlId='description'>
						<Form.Label>RAZON SOCIAL</Form.Label>
						<Form.Control type='text' placeholder='Ingrese la razon Social de la empresa' name ='razon_social' {...register('razon_social',{required: true})}value ={razon_social} onChange={e => setRazon_social(e.target.value)} />
						{errors.razon_social && <p id="text-error">El valor del RAZON SOCIAL es requerido</p>}
						</Form.Group>

						<Form.Group controlId='title'>
						<Form.Label>DIRECCION</Form.Label>
						<Form.Control type='text' placeholder='Ingrese La Direccion' name ='direccion' {...register('direccion',{required: true})} value = {direccion} onChange={e => setDireccion(e.target.value)} />
						{errors.direccion && <p id="text-error">El valor del DIRECCION es requerido</p>}
						</Form.Group>

						<Form.Group controlId='description'>
						<Form.Label>TELEFONO</Form.Label>
						<Form.Control type='text' placeholder='Ingrese Telefono' name ='telefono' {...register('telefono',{required: true})} value ={telefono} onChange={e => setTelefono(e.target.value)} />
						{errors.telefono && <p id="text-error">El valor de TELEFONO es requerido</p>}
						</Form.Group>

                        <Form.Group controlId='description'>
						<Form.Label>CORREO</Form.Label>
						<Form.Control type='email' placeholder='Ingrese correo electronico' name ='correo'{...register('correo',{required: true})}  value ={correo} onChange={e => setCorreo(e.target.value)} />
						{errors.correo && <p id="text-error">El valor del CORREO es requerido</p>}
						</Form.Group>

                        <Form.Group controlId='description'>
						<Form.Label>CEDULA</Form.Label>
						<Form.Control type='text' placeholder='Ingrese La cedula del representante' name ='cedula' {...register('cedula',{required: true})} value ={cedula} onChange={e => setCedula(e.target.value)} />
						{errors.cedula && <p id="text-error">El valor del CEDULA es requerido</p>}
						</Form.Group>

                        <Form.Group controlId='description'>
						<Form.Label>NOMBRE REPRESENTANTE</Form.Label>
						<Form.Control type='text' placeholder='Ingrese Nombre del representante' name ='nombre_rep' {...register('nombre_rep',{required: true})} value ={nombre_rep} onChange={e => setNombre_rep(e.target.value)} />
						{errors.nombre_rep && <p id="text-error">El valor del NOMBRE REPRESENTANTE es requerido</p>}
						</Form.Group>

                        <Form.Group controlId='description'>
						<Form.Label>SU EMPRESA ES:</Form.Label>
                        <Form.Select aria-label="" name ='vocacion' value ={tipo_empresa} onChange={e => setTipo_empresa(e.target.value)} >
						<option >Seleccione Tipo de empresa</option>
                            <option value="PEQUEÑA">PEQUEÑA</option>
                            <option value="MEDIANA">MEDIANA</option>
                            <option value="GRANDE">GRANDE</option>
                        </Form.Select>
						{/* <Form.Control type='select' placeholder='Ingrese La Vocacion' name ='vocacion' value ={vocacion} onChange={e => setVocacion(e.target.value)} /> */}
						</Form.Group>
						<br/>
						<Button variant='primary' type='submit' >Adicionar Empresa</Button>
						<br/>
						{/* onClick={AddTodoHandler}  */}
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