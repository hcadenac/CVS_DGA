import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Nav, Navbar, Card } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt} from "react-icons/fa"; 
import { FaSignInAlt} from "react-icons/fa";
import { FaHome} from "react-icons/fa";
import { FaIndustry } from "react-icons/fa";
import imagen from '../img/imgcvs.jpg';

const NavBar = () =>{
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

        const handleLogout = async() =>{
            try{
                const respuesta = await axios.post('/auth/logout/',{})
                const { status } = respuesta
                //console.log(respuesta)
                if (status === 200){
                    localStorage.removeItem('nombre');
                    setIsAuth(false);
                    navigate('/Login/');
                }
            }catch (err) {
                console.log(err)
            } 
        };
    useEffect(() => {
        if (localStorage.getItem('nombre') !== null) {
             setIsAuth(true);
            } 
        }, []);
return(

    <div>
    <div>
    {/* <head> */}
    <Card className="bg-dark text-blue" style={{width:"1935px", height:"110px"}}>
    <Card.Img src={imagen} alt="Card image" />
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
     {/* {isAuth === true} { */}
       {localStorage.getItem('nombre') !== null ? (
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
        <Nav.Link as={Link} to={"/AddEmpresa"}>Registar Empresa</Nav.Link>
        <Nav.Link as={Link} to={"/GestionEmpresa"}><FaIndustry /> Consulta Empresa</Nav.Link>
        <Nav.Link as={Link} to={"/ListaMunicipio"} > Consultar Municipio</Nav.Link>
    </Nav>
    <Nav>
    <Nav.Link onClick={handleLogout}><FaSignOutAlt /> Cerrar Sesion</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">{localStorage.getItem('nombre')}</Nav.Link>
    </Nav>
    </Navbar.Collapse>
       ):(
    // } else {
        <Navbar.Collapse className="justify-content-end">
            <Nav>
                <Nav.Link as={Link} to={"/Login"}><FaSignInAlt /> Iniciar Sesion</Nav.Link>
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