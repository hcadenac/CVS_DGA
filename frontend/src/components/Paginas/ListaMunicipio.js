import axios from 'axios'
import React, { useState, useEffect  } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";


function ListaMunicipio ({codigo, nombre}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [show, setShow] = useState(false);
  const [newCodigo, setCodigo] = useState(codigo)
	const [newNombre, setNombre] = useState(nombre)
  
  const columns= [
        { title: 'Codigo', field: 'codigo_mpio' },
        { title: 'Municipio', field: 'nombre_mpio' },
      ];

  const [data, setData]= useState([]);
     //Cierra del Dialogo Modal///
    const handleClose = () => {
    	setShow(false);
    }

	//Muestra del Dialogo Modal con los datos del registro selecionado///
  const handleShow = (codigo, nombre) => {
      setShow(true);
      setCodigo(codigo)
      setNombre(nombre)
          
  }

  //edicion de informacIon en la base de datos..///
  const editTodoHandler = async (codigo_mpio, nombre_mpio) => {
    	handleClose()
    	const listMpio = {
    		codigo_mpio,
    		nombre_mpio,
    	}
    	setCodigo(codigo)
    	setNombre(nombre)
      
        console.log(listMpio)
        const id = (listMpio.codigo_mpio)
        //console.log(id)
      try {
			const respuesta = await axios.put('/api/municipios/'+id+'/', listMpio)
			const { status } = respuesta
			if (status === 200){
				alert("!!EL REGISTRO SE ACTUALIZO CORRECTAMENTE!!")
			} 
			getLista()
		} catch(err) {
			console.log(err)
		}
  }
  const getLista = async () => {
		try {
			const response = await axios.get('/api/municipios/')
      console.log(response)
			const { data } = response
			setData(data)
		} catch (err) {
			console.log(err)
		}
	} 
  const deleteMpio = async id => {
		if(window.confirm('ESTA SEGURO DE BORRAR ESTE REGISTRO?'))
			try {
				await axios.delete('/api/municipios/'+id+'/')
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
	
  return (
	<div id='tabla1'>
        <MaterialTable
          columns={columns}
          data={data}
          title="Municipios de Cordoba"  
          icons={tableIcons}
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: 'Editar Municipio',
              onClick: (event, rowData) => handleShow(rowData.codigo_mpio, rowData.nombre_mpio)
            },
            {
              icon: tableIcons.Delete,
              tooltip: 'Eliminar Municipio',
              onClick: (event, rowData) => deleteMpio(rowData.codigo_mpio),
              //onClick: (event, rowData) => alert("Esta Seguro de Eliminar : " + rowData.nombre_mpio),
            }
          ]}
          onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
          options={{
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: '#2471A3',
              color: '#FFF'
            },
            rowStyle:  rowData => ({
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
            })}}
          
          localization={{
            header:{
              actions: "Acciones"
            }            
          }}
        />
        {/* Formulario modal para edicion de informacion */}
        <Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Editar registro</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<Form>
					<Form.Group controlId='title'>
					  <Form.Label>Codigo</Form.Label>
					  <Form.Control readOnly type='text' value={newCodigo} onChange={e => setCodigo(e.target.value)} />
					</Form.Group>

					<Form.Group controlId='description'>
					  <Form.Label>Nombre</Form.Label>
					  <Form.Control type='tex' value={newNombre} onChange={e => setNombre(e.target.value)} />
					</Form.Group>
				</Form>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="danger" onClick={handleClose}>
	            Cerrar
	          </Button>
	          <Button variant="primary" onClick={() => editTodoHandler(newCodigo, newNombre )}>
	            Guardar Cambios
	          </Button>
	        </Modal.Footer>
	      </Modal>
    </div>
    );
}

export default ListaMunicipio