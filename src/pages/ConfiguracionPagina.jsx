import axios from 'axios'
import {Component} from 'react'
import React from 'react'
import { Form,Button,Container } from 'react-bootstrap'



export default class ConfiguracionPagina extends Component{

    state={
        pagina:{
            idPage:0,
            pageSize:0

        }
    }


    componentDidMount(){

        axios.get("api/paginas")
        .then(res=>{
            this.setState({
               
                pagina:{
                    ...this.state.pagina,
                    idPage:res.data[0].idPage,
                    pageSize:res.data[0].pageSize
                    
            }})
                
        })
        
        
    }
    editarPagina=(e)=>{
        e.preventDefault();
        const {pagina}=this.state;
        axios.put(`api/paginas/${pagina.idPage}`,pagina)
    }

    onChangePageSize=(value)=>{
        this.setState({
            pagina:{
                ...this.state.pagina,
                pageSize:value
            }
        })
    }
    render(){
        const {pagina}=this.state;
        return (
            <Container>
                <Form style={{width:'300px'}} onSubmit={this.editarPagina}>

                    <Form.Group controlId="pageSize">
                        <Form.Label>cantidad de noticias por p&aacute;gina</Form.Label>
                        <Form.Control type="number" min="1" max="50" onChange={(e)=>this.onChangePageSize(e.target.value)}
                        value={pagina.pageSize}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </Container>
        )
    }

}
