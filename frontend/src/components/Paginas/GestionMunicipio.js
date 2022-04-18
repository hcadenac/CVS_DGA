import React, { useState, useEffect } from 'react'
import { Form, Button, Modal, Card, Col, Row  } from 'react-bootstrap'
import axios from 'axios'


function GestionMunicipio  ({codigo, nombre, subregion, vocacion}) {
    const [lista, setLista] = useState([])
    const [show, setShow] = useState(false);

    const [newCodigo, setCodigo] = useState(codigo)
	const [newNombre, setNombre] = useState(nombre)
    const [newSubregion, setSubregion] = useState(subregion)
	const [newVocacion, setVocacion] = useState(vocacion)

	//Cierra del Dialogo Modal///
    const handleClose = () => {
    	setShow(false);
    }

	//Muestra del Dialogo Modal con los datos del registro selecionado///
	const handleShow = (codigo, nombre, subregion, vocacion) => {
		setShow(true);
		setCodigo(codigo)
    	setNombre(nombre)
        setSubregion(subregion)
    	setVocacion(vocacion)	
	}

		//obtiene la informacion de los municipios de la base de datos// 
    const getLista = async () => {
		try {
			const response = await axios.get('/municipios/')
			const { data } = response
			setLista(data)
		} catch (err) {
			console.log(err)
		}
	} 
   
	//edicion de informacIon en la base de datos..///
    const editTodoHandler = async (codigo_mpio, nombre_mpio, subregion, vocacion) => {
    	handleClose()
    	const todo = {
    		codigo_mpio,
    		nombre_mpio,
            subregion,
            vocacion,
    	}
    	setCodigo(codigo)
    	setNombre(nombre)
        setSubregion(subregion)
    	setVocacion(vocacion)
      
        console.log(todo)
        const id = (todo.codigo_mpio)
        //console.log(id)
        try {
			const respuesta = await axios.put('/municipios/'+id+'/', todo)
			const { status } = respuesta
			if (status === 200){
				alert("!!EL REGISTRO SE ACTUALIZO CORRECTAMENTE!!")
			} 
			getLista()
		} catch(err) {
			console.log(err)
		}
    }
    
	//Borrar informacion en la base de datos////
    const deleteTodo = async id => {
		if(window.confirm('ESTA SEGURO DE BORRAR ESTE REGISTRO?'))
			try {
				await axios.delete('/municipios/'+id+'/')
				getLista()
			} catch(err) {
				console.log(err)
			}
        //window.location.reload();
        //window.location.href="/municipios/";
	}
    useEffect(() => {
		getLista()
	}, [])

    //muestra tabla con los datos de la consulta///
    return (
        <div className="table-responsive">
            <br/>
			<Row className='justify-content-center pt-11'>
				<Col sm="5">
					<Card className='p-11'>
            <table className="table table-striped bordered border-Secondary table-hover">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                 {lista.map((todo, index) =>( 
                    <tr key={index}>
                        <td>{todo.codigo_mpio}</td>
                        <td>{todo.nombre_mpio}</td>
                        <td><button className="btn btn-primary" onClick={() => handleShow(todo.codigo_mpio, todo.nombre_mpio, todo.subregion, todo.vocacion)}> Editar</button>{"  " }
                        <button className="btn btn-danger" onClick={() => deleteTodo(todo.codigo_mpio)} > Borrar</button>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </table>
					</Card>
				</Col>
			</Row>
			{/* Formulario modal para edicion de informacion */}
            <Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Editar registro</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<Form>
					<Form.Group controlId='title'>
					  <Form.Label>Codigo</Form.Label>
					  <Form.Control type='text' value={newCodigo} onChange={e => setCodigo(e.target.value)} />
					</Form.Group>

					<Form.Group controlId='description'>
					  <Form.Label>Nombre</Form.Label>
					  <Form.Control type='text' value={newNombre} onChange={e => setNombre(e.target.value)} />
					</Form.Group>

                    <Form.Group controlId='subregion'>
					  <Form.Label>subregion</Form.Label>
					  <Form.Control type='text' value={newSubregion} onChange={e => setSubregion(e.target.value)} />
					</Form.Group>

                    <Form.Group controlId='vocacion'>
					  <Form.Label>Vocacion</Form.Label>
					  <Form.Control type='text' value={newVocacion} onChange={e => setVocacion(e.target.value)} />
					</Form.Group>
				</Form>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="danger" onClick={handleClose}>
	            Cerrar
	          </Button>
	          <Button variant="primary" onClick={() => editTodoHandler(newCodigo, newNombre, newSubregion, newVocacion )}>
	            Guardar Cambios
	          </Button>
	        </Modal.Footer>
	      </Modal>
        </div>
    );
}

export default GestionMunicipio