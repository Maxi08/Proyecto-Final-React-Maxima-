import React from 'react'
import {Card,Button,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../pages/VistaNoticias.css'
import '../pages/style.css';

export default function VistaNoticias({noticia}){
    return(
        <Container className="contenedor">
            <Card style={{width:'18rem'}} className="card">
            <Link to={{
                pathname:'noticiasdetalle/'+noticia.idNoticia,
                state:{noticia:noticia}
            }}>
                <Card.Img variant="top" src={noticia.Portada}/>

            </Link>
            <Card.Body>
                <Card.Title>{noticia.titular}</Card.Title>
                <Card.Text>
                    {noticia.Resumen}
                </Card.Text>
                <Link to={{
                    pathname:'noticiasdetalle/'+noticia.idNoticia,
                    state:{noticia:noticia}
                }}>
                    <Button variant="outline-dark"   >Ir a la noticia</Button>
                </Link>
            </Card.Body>
        </Card>
    </Container>
    )
    

}