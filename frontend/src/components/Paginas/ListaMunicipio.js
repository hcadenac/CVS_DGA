import axios from 'axios'
import React, { useState, useEffect  } from 'react'
import { Button, Card, Col, Container, Form, Row, Modal } from 'react-bootstrap'
//import DataTable from 'react-data-table-component';
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import { FaEdit } from "react-icons/fa"


function ListaMunicipio () {
  const [selectedRow, setSelectedRow] = useState(null);
    const columns= [
        { title: 'Codigo', field: 'codigo_mpio' },
        { title: 'Municipio', field: 'nombre_mpio' },
      ];

    const [data, setData]= useState([]);
    
    const getLista = async () => {
		try {
			const response = await axios.get('/municipios/')
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
	
  return (
	<div id='tabla1'>
    <Row className='justify-content-center'>
      <Col sm="2">
        <Button variant='primary' type='submit' onClick={() => window.location.href="/AddEmpresa/"}><FaEdit /> REGISTRAR NUEVO DGA</Button>
      </Col>
    </Row>
        <MaterialTable
             columns={columns}
          data={data}
          title="Municipios de Cordoba"  
          icons={tableIcons}
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: 'Editar Municipio',
              // onClick: (event, rowData) => seleccionarArtista(rowData, "Editar")
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
              backgroundColor: '#01579b',
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
    </div>
    );
}

export default ListaMunicipio