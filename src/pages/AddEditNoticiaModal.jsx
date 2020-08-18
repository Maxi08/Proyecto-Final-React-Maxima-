import React,{Component} from 'react'
import axios from 'axios'

import {Container,Row,Col,Card,Form,FormGroup,Button} from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css' 
import ReactQuill from 'react-quill'
import '../pages/style.css'



export default function AddEditNoticiaModal({onClose,onAccept}){



    const onAddEditCategorySubmit=(e)=>{
        e.preventDefault();
        const titular=e.target.elements["titular"].value;
        const Portada=e.target.elements["Portada"].value;
        const Resumen=e.target.elements["Resumen"].value;
        const Contenido=e.target.elements["Contenido"].value;
        const idCategoria=e.target.elements["idCategoria"].value;
        const autor=e.target.elements["autor"].value;
        onAccept({
            titular:titular,
            Portada:Portada,
            Resumen:Resumen,
            Contenido:Contenido,
            idCategoria:idCategoria,
            autor:autor
        })

    }

    return(
        
        <div className="modal fade show"  style={{display:'block'}} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Agrega y edita las noticias</h5>
                    <button type="button" className="close" onClick={onClose}  data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                    
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose} data-dismiss="modal">Close</button>
                    <button type="Submit" className="btn btn-primary" form="addEditCategoryForm">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}