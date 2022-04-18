import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'

const Login = () => {

	//const [list, setList] = useState([{}]);
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [show, setShow] = useState(false);
	const [mensaje, setMensaje] = useState('');
	const [color, setColor] = useState(''); 

	/* Cierra el dialogo Modal */
	const handleClose = () => {
    	setShow(false);
	}

	/* Autenticacion basica con Login */
	const AddTodoHandler = async (e) => {
		e.preventDefault()
		const autUser = ({
			username,
			password,
		})
		/*console.log(autUser)*/
		try{
			const respuesta = await axios.post('/auth/login/', autUser, {withCredentials: true})
			const { status } = respuesta
			if (status === 200){
				localStorage.setItem('nombre', username)
				//setColor('success')
				//setMensaje('..USUARIO AUTENTICADO SATISFACTORIAMENTE..')
			//setShow(true)
            window.location.href="/GestionEmpresa/";
			}
			
		}catch (err) {
			console.log(err)
			setColor('danger')
			setMensaje("!!USUARIO O CONTRASEÑA INVALIDOS!!  :")
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
				<Col sm="5">
					<Card className='p-5'>
					<h3 align="center">Inicio de Sesion</h3>
					<Form>
						<Form.Group controlId='title'>
						<Form.Label>Usuario</Form.Label>
						<Form.Control type='text' placeholder='Ingrese el Usuario' name ='username' value ={username} onChange={e => setUsername(e.target.value)} />
						</Form.Group>

						<Form.Group controlId='description'>
						<Form.Label>Contraseña</Form.Label>
						<Form.Control type='password' placeholder='Ingrese la contraseña' name ='password' value ={password} onChange={e => setPassword(e.target.value)} />
						</Form.Group>
						<br/>
						<div className="d-grid gap-2">
							<Button variant='primary' type='submit' onClick={AddTodoHandler} >Ingresar</Button>
						</div>
						<br/>
					</Form>
					</Card>
				</Col>
			</Row>
		</Container>

		{/* ///formulario Modal para mostrar dialogo de verificacion de registro de datos/// */}
		<Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Autenticacion de Usuario</Modal.Title>
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

export default Login