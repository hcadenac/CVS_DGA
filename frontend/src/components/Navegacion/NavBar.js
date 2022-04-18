import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Nav, Navbar, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaSignOutAlt} from "react-icons/fa"; 
import { FaSignInAlt} from "react-icons/fa";
import { FaHome} from "react-icons/fa";
import { FaIndustry } from "react-icons/fa";

const NavBar = () =>{
    const [isAuth, setIsAuth] = useState(false);

        const handleLogout = async() =>{
            try{
                const respuesta = await axios.post('/auth/logout/',{})
                const { status } = respuesta
                console.log(respuesta)
                if (status === 200){
                    localStorage.clear();
                    window.location.href="/Login/";
                }
            }catch (err) {
                console.log(err)
                //setColor('danger')
                //setMensaje("!!USUARIO O CONTRESEÑA INVALIDOS!!  :")
                //alert("!!ERROR EN EL REGISTRO DE DATOS!!")
                //setShow(true)
            } 
        };
        useEffect(() => {
            //var nombre  = localStorage.getItem('nombre')
            if (localStorage.getItem('nombre') !== null) {
              setIsAuth(true);
            }
          }, []);
return(

    <div>
    <div>
    {/* <head> */}
    <Card className="bg-dark text-blue" style={{width:"1872px", height:"110px"}}>
    <Card.Img src="/imgcvs.jpg" alt="Card image" />
    <Card.ImgOverlay>
    <Card.Title  style={{textAlign:"center", color:"blue"}}> REGISTRO DEPARTAMENTOS DE GESTION AMBIENTAL</Card.Title>
    <Card.Text style={{textAlign:"center", color:"blue"}}>
      Corporación Autonoma Regional de los Valles de Sinu y San Jorge
    </Card.Text>
    </Card.ImgOverlay>
    </Card>
    </div>
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand as={Link} to={"/Inicio"}>< FaHome/> Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       {isAuth === true ? (
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
        <Nav.Link as={Link} to={"/AddEmpresa"}>Registar Empresa</Nav.Link>
        {/* <Nav.Link as={Link} to={"/AddMunicipio"}>Registrar Municipio</Nav.Link> */}
        <Nav.Link as={Link} to={"/GestionEmpresa"}><FaIndustry /> Consulta Empresa</Nav.Link>
        <Nav.Link as={Link} to={"/ListaMunicipio"} > Consultar Municipio</Nav.Link>
    </Nav>
    <Nav>
    <Nav.Link onClick={handleLogout}><FaSignOutAlt /> Cerrar Sesion</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">{localStorage.getItem('nombre')}</Nav.Link>
    </Nav>
    </Navbar.Collapse>
     ):(
        <Navbar.Collapse className="justify-content-end">
            <Nav>
                <Nav.Link href="/Login"><FaSignInAlt /> Iniciar Sesion</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        )}
  </Container>
</Navbar>    
    </>
    </div>
    
    );
}
export default NavBar