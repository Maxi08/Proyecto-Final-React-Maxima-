
import React from 'react';
import{Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import NewsEdition from '../pages/NewsEdition'
import Categorias from '../pages/Categorias'
import Usuarios from '../pages/Usuarios'
import MostrarNoticias from '../pages/MostrarNoticias'
import VerNoticiaDetalle from "../components/VerNoticiaDetalle"
import UsuarioRegistroEstandar from '../pages/UsuarioRegistroEstandar'
import LoginUsuarioEstandar from '../pages/LoginUsuarioEstandar'
import ConfiguracionPagina from '../pages/ConfiguracionPagina'
// import MostrarNoticiasTabla from '../pages/MostrarNoticiasTabla'

import '../pages/style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'



const NavBar = () => {
    return(
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/noticias">Corea news</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/categorias" >Categorias</Nav.Link>
                <Nav.Link as={Link} to="/noticias" >Inicio</Nav.Link>
                <Nav.Link as={Link} to="/usuarios" >Registro</Nav.Link>
                {/* <Nav.Link as={Link} to="/mostrarnoticiastabla" >Mis noticias </Nav.Link> */}
                {/* <Nav.Link href="#link">Link</Nav.Link> */}
                <Nav.Link as={Link} to="/newsedition" >Noticias</Nav.Link>
                <Nav.Link as={Link} to="/configuracionpagina" >Pagina config.</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
            <Form inline>
           
           
            <Button variant="outline-secondary" as ={Link} to="/loginusuarioestandar">Iniciar sesion</Button>
            
            <Button  variant="outline-secondary" as={Link} to="/usuarioregistroestandar">Registrarse</Button>
            </Form>
            </Navbar.Collapse>
        </Navbar>
        <Switch>
            <Route path="/newsedition">
                <NewsEdition>

                </NewsEdition>

            </Route>
            <Route path="/categorias">
               <Categorias>

               </Categorias>

            </Route>
            <Route path="/usuarios">
               <Usuarios>

               </Usuarios>

            </Route>
            <Route path="/noticias">
                <MostrarNoticias>

                </MostrarNoticias>
               

            </Route>
            <Route path="/noticiasdetalle/:idNoticia">
               <VerNoticiaDetalle>

               </VerNoticiaDetalle>
               

            </Route>
            <Route path="/usuarioregistroestandar">
               <UsuarioRegistroEstandar>

               </UsuarioRegistroEstandar>
               

            </Route>
            <Route path="/loginusuarioestandar">
               <LoginUsuarioEstandar>

               </LoginUsuarioEstandar>

            </Route>

            <Route path="/configuracionpagina">
              <ConfiguracionPagina>

              </ConfiguracionPagina>

            </Route>

            {/* <Route path="/mostrarnoticiastabla">
             <MostrarNoticiasTabla>

             </MostrarNoticiasTabla>

            </Route> */}
        </Switch>
        </Router>
        
    )
}

export default NavBar;
