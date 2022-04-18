import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Modal } from 'react-bootstrap'

const AddMunicipio = () => {

	//const [list, setList] = useState([{}]);
	const [codigo_mpio, setCodigo] = useState('')
	const [nombre_mpio, setNombre] = useState('')
	const [subregion, setSubregion] = useState('')
	const [vocacion, setVocacion] = useState('')
	const [show, setShow] = useState(false);
	const [mensaje, setMensaje] = useState('');
	const [color, setColor] = useState('');

	/* Cierra el dialogo Modal */
	const handleClose = () => {
    	setShow(false);
	}

	/* Adiciona un registro a la base de datos */
	const AddTodoHandler = async (e) => {
		e.preventDefault()
		const addMpio = ({
			codigo_mpio,
			nombre_mpio,
			subregion,
			vocacion,
		})
		console.log(addMpio)
		try{
			const respuesta = await axios.post('/municipios/', addMpio)
			const { status } = respuesta
			if (status === 201){
				setColor('success')
				setMensaje('..LA INFORMACION SE GRABO SATISFACTORIAMENTE..')
			setShow(true)
			}
			
		}catch (err) {
			console.log(err)
			setColor('danger')
			setMensaje("!!ERROR EN EL REGISTRO DE DATOS!!  :"+err)
			//alert("!!ERROR EN EL REGISTRO DE DATOS!!")
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
					<h3 align="center">Registrar Municipio</h3>
					<Form>
						<Form.Group controlId='title'>
						<Form.Label>Codigo</Form.Label>
						<Form.Control type='text' placeholder='Ingrese el Codigo del municipio' name ='codigo' value ={codigo_mpio} onChange={e => setCodigo(e.target.value)} />
						</Form.Group>

						<Form.Group controlId='description'>
						<Form.Label>Nombre</Form.Label>
						<Form.Control type='text' placeholder='Ingrese el Nombre' name ='nombre' value ={nombre_mpio} onChange={e => setNombre(e.target.value)} />
						</Form.Group>

						<Form.Group controlId='title'>
						<Form.Label>Subregion</Form.Label>
						<Form.Control type='text' placeholder='Ingrese La Subregion' name ='subregion' value = {subregion} onChange={e => setSubregion(e.target.value)} />
						</Form.Group>

						<Form.Group controlId='description'>
						<Form.Label>Vocacion</Form.Label>
						<Form.Control type='text' placeholder='Ingrese La Vocacion' name ='vocacion' value ={vocacion} onChange={e => setVocacion(e.target.value)} />
						</Form.Group>
						<br/>
						<Button variant='primary' type='submit' onClick={AddTodoHandler} >Adicionar Municipio</Button>
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

export default AddMunicipio