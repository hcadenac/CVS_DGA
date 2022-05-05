import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { FaEdit } from "react-icons/fa"
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";


const GestionEmpresa = ({nit, ciuu, camara, razon_social, municipio, direccion, telefono, correo, web, cedula, nombre_rep, tipo_empresa,
  sector_prod, fecha_reg, fecha_dga, nombre_dga, nivel_estudio, titulo, cargo, tipo_dga, email_dga, fecha_regdga}) => {

    const [lista, setLista] = useState([])
    const [data, setData]= useState([]);
    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const columns= [
      { title: 'NIT', field: 'nit' },
      { title: 'RAZON SOCIAL', field: 'razon_social' },
      { title: 'DIRECCION', field: 'direccion' },
      { title: 'MUNICIPIO', field: 'municipio' },
      { title: 'NOMBRE REPRESENTANTE', field: 'nombre_rep' },
      { title: 'RESPONSABLE DGA', field: 'nombre_dga' },
    ];

    const [newNit, setNit] = useState(nit)
    const [newCiuu, setCiuu] = useState(ciuu)
	  const [newCamara, setCamara] = useState(camara)
    const [newRazon_social, setRazon_social] = useState(razon_social)
    const [newMunicipio, setMunicipio] = useState(municipio)
	  const [newDireccion, setDireccion] = useState(direccion)
    const [newTelefono, setTelefono] = useState(telefono)
    const [newCorreo, setCorreo] = useState(correo)
    const [newWeb, setWeb] = useState(web)
    const [newCedula, setCedula] = useState(cedula)
    const [newNombre_rep, setNombre_rep] = useState(nombre_rep)
    const [newTipo_empresa, setTipo_empresa] = useState(tipo_empresa)
    const [newSector_prod, setSector_prod] = useState(sector_prod)
    const [newFecha_reg, setFecha_reg] = useState(fecha_reg)
    const [newFecha_dga, setFecha_dga] = useState(fecha_dga)
    const [newNombre_dga, setNombre_dga] = useState(nombre_dga)
    const [newNivel_estudio, setNivel_estudio] = useState(nivel_estudio)
    const [newTitulo, setTitulo] = useState(titulo)
    const [newCargo, setCargo] = useState(cargo)
    const [newTipo_dga, setTipo_dga] = useState(tipo_dga)
    const [newEmail_dga, setEmail_dga] = useState(email_dga)
    const [newFecha_regdga, setFecha_regdga] = useState(fecha_regdga)

    //const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [busqueda, setBusqueda]= useState("");
    const getLista = async () => {
		try {
			const response = await axios.get('/api/empresas/')
      console.log(response)
			const { data } = response
			setLista(data)
      setData(data)
      setTablaUsuarios(data)

		} catch (err) {
			console.log(err)
		}
	} 

  ///*****funcion para buscar y filtar datos ingesados en un inputtext****///
  const handleChangeBuscar=e=>{
      setBusqueda(e.target.value);
      console.log(e.target.value)
      filtrar(e.target.value);
  }
  
  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
      if(elemento.nit.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.razon_social.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setLista(resultadosBusqueda)
  }
  ///************************************************////////


  /*Muestra la informacion a editar en el formulario MODAL*/
  const handleShow = async (nit, razon_social, municipio, direccion, telefono, correo, cedula, nombre_rep, tipo_empresa ) => {
        
      try {
        const respuesta = await axios.get('api/empresas/'+nit+'/')
        // const { status } = respuesta
        console.log(respuesta)
			  const { data } = respuesta
			  setData(data)
        console.log(data.nit)
        setNit(data.nit)
        setCiuu(data.ciuu)
        setCamara(data.camara)
        setRazon_social(data.razon_social)
        setMunicipio(data.municipio)
    	  setDireccion(data.direccion)
        setTelefono(data.telefono)
        setCorreo(data.correo)
        setWeb(data.web)
        setCedula(data.cedula)
        setNombre_rep(data.nombre_rep)
        setTipo_empresa(data.tipo_empresa)
        setSector_prod(data.sector_prod)
        setFecha_reg(data.fecha_reg)
        setFecha_dga(data.fecha_dga)
        setNombre_dga(data.nombre_dga)
        setNivel_estudio(data.nivel_estudio)
        setTitulo(data.titulo)
        setCargo(data.cargo)
        setTipo_dga(data.tipo_dga)
        setEmail_dga(data.email_dga)
        setFecha_regdga(data.fecha_regdga)
        

      } catch(err) {
        console.log(err)
      }
      
        setShow(true);
        //setNit(nit)
        

    }
    //Cierra del Dialogo Modal///
    const handleClose = () => {
    	setShow(false);
    }

    //edicion de informacion en la base de datos..///
    const editTodoHandler = async (nit, ciuu, camara, razon_social, municipio, direccion, telefono, correo, web, cedula, nombre_rep, tipo_empresa,
      sector_prod, fecha_reg, fecha_dga, nombre_dga, nivel_estudio, titulo, cargo, tipo_dga, email_dga, fecha_regdga) => {
    	  handleClose()
    	  const listaDatos = {
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
          fecha_regdga,
    	}
      setData(data)
      console.log(nit)
      setNit(nit)
      setCiuu(ciuu)
      setCamara(camara)
      setRazon_social(razon_social)
      setMunicipio(municipio)
      setDireccion(direccion)
      setTelefono(telefono)
      setCorreo(correo)
      setWeb(web)
      setCedula(cedula)
      setNombre_rep(nombre_rep)
      setTipo_empresa(tipo_empresa)
      setSector_prod(sector_prod)
      setFecha_reg(fecha_reg)
      setFecha_dga(fecha_dga)
      setNombre_dga(nombre_dga)
      setNivel_estudio(nivel_estudio)
      setTitulo(titulo)
      setCargo(cargo)
      setTipo_dga(tipo_dga)
      setEmail_dga(email_dga)
      setFecha_regdga(fecha_regdga)
      
        console.log(listaDatos)
        const id = (listaDatos.nit)
        //console.log(id)
        try {
			const respuesta = await axios.put('/api/empresas/'+id+'/', listaDatos, {withCredentials: true})
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
				await axios.delete('/api/empresas/'+id+'/', {withCredentials: true})
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

  <>
  
  <div id='tabla1'>
  <div>
				<br></br>	
		<Row className='justify-content-center pt-2'>
			<Col sm="8">
          <Button variant='success' type='submit' onClick={() => navigate('/AddEmpresa')}><FaEdit /> REGISTRAR NUEVO DGA</Button>
			</Col>
		</Row>
		
			</div>
    <br></br>
    <MaterialTable
          columns={columns}
          data={data}
          title="Empresas con DGA registrado en CVS"  
          icons={tableIcons}
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: 'Editar DGA',
              onClick: (event, rowData) => handleShow(rowData.nit)
            },
            {
              icon: tableIcons.Delete,
              tooltip: 'Eliminar Registro',
              onClick: (event, rowData) => deleteTodo(rowData.nit),
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
              <Form.Label>NIT</Form.Label>
              <Form.Control type='text' value={newNit} onChange={e => setNit(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='title'>
              <Form.Label>CIUU</Form.Label>
              <Form.Control type='text' value={newCiuu} onChange={e => setCiuu(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='title'>
              <Form.Label>CAMARA</Form.Label>
              <Form.Control type='text' value={newCamara} onChange={e => setCamara(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>RAZON SOCIAL</Form.Label>
              <Form.Control type='text' value={newRazon_social} onChange={e => setRazon_social(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='subregion'>
              <Form.Label>MUNICIPIO</Form.Label>
              <Form.Control type='text' value={newMunicipio} onChange={e => setMunicipio(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='vocacion'>
              <Form.Label>DIRECCION</Form.Label>
              <Form.Control type='text' value={newDireccion} onChange={e => setDireccion(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='vocacion'>
              <Form.Label>TELEFONO</Form.Label>
              <Form.Control type='text' value={newTelefono} onChange={e => setTelefono(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='vocacion'>
              <Form.Label>CORREO</Form.Label>
              <Form.Control type='email' value={newCorreo} onChange={e => setCorreo(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>WEB</Form.Label>
              <Form.Control type='email' value={newWeb} onChange={e => setWeb(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='vocacion'>
              <Form.Label>DOCUMENTO IDENTIFICACION </Form.Label>
              <Form.Control type='text' value={newCedula} onChange={e => setCedula(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='vocacion'>
              <Form.Label>NOMBRE REPRESENTANTE</Form.Label>
              <Form.Control type='text' value={newNombre_rep} onChange={e => setNombre_rep(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='vocacion'>
              <Form.Label>TIPO EMPRESA</Form.Label>
              <Form.Control type='text' value={newTipo_empresa} onChange={e => setTipo_empresa(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>SECTOR PRODUCTIVO</Form.Label>
              <Form.Control type='text' value={newSector_prod} onChange={e => setSector_prod(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>FEHA REGISTRO</Form.Label>
              <Form.Control type='text' value={newFecha_reg} onChange={e => setFecha_reg(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>FECHA CREACION DGA</Form.Label>
              <Form.Control type='text' value={newFecha_dga} onChange={e => setFecha_dga(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>NOMBRE</Form.Label>
              <Form.Control type='text' value={newNombre_dga} onChange={e => setNombre_dga(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>NIVEL EDUCATIVO</Form.Label>
              <Form.Control type='text' value={newNivel_estudio} onChange={e => setNivel_estudio(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>TITULO</Form.Label>
              <Form.Control type='text' value={newTitulo} onChange={e => setTitulo(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>CARGO</Form.Label>
              <Form.Control type='text' value={newCargo} onChange={e => setCargo(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>TIPO DGA</Form.Label>
              <Form.Control type='text' value={newTipo_dga} onChange={e => setTipo_dga(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>EMAIL DGA</Form.Label>
              <Form.Control type='text' value={newEmail_dga} onChange={e => setEmail_dga(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='vocacion'>
              <Form.Label>FECHA REG DGA</Form.Label>
              <Form.Control type='text' value={newFecha_regdga} onChange={e => setFecha_regdga(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => editTodoHandler(newNit, newCiuu, newCamara, newRazon_social, newMunicipio, newDireccion, newTelefono, newCorreo, newWeb, newCedula, newNombre_rep, newTipo_empresa,
            newSector_prod, newFecha_reg, newFecha_dga, newNombre_dga, newNivel_estudio, newTitulo, newCargo, newTipo_dga, newEmail_dga, newFecha_regdga)}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
     
    </div>
    </>
    
    );

}
export default GestionEmpresa