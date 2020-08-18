import React from 'react';
import{Nav} from 'react-bootstrap';

export default function CategoriasNavBar({categorias,categoriaSeleccionada,categoriaActual}){
  
  return (
    <Nav variant="pills" defaultActiveKey={categoriaActual}>
        {categorias !==null? categorias.map((item,index)=>
        <Nav.Item key={index}>
          <Nav.Link eventKey={item.idCategoria}
          onClick={()=>{
            categoriaSeleccionada(item.idCategoria)
          }}>{item.nombre}</Nav.Link>
        </Nav.Item>
    ):null}
   
  </Nav>
)
  
}

