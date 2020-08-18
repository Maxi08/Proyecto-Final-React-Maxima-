import React,{Component} from 'react'
import axios from 'axios'

import {Container,Row,Col,Card,Form,FormGroup,Button} from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css' 
import ReactQuill from 'react-quill'
import '../pages/style.css'



class NewsEdition extends Component{
   constructor(props){
      super(props);
      this.state={
        categorias:null,
        noticias:{
             
            titular:'',
            Portada:null,
            Resumen:'',
            Contenido:'',
            autor:'36591c3f-f623-4df9-99c8-9e7e81515742',
           
            idCategoria:0,
           
            fecha_creacion:new Date(),
            fecha_publicacion:new Date(),
            
            idEstado:1         

          }
          ,titularError:'',
          PortadaError:'',
          ResumenError:''

      }
   }
   modules = {
    toolbar: {
        container: [
            [{'header': '1'}, {'header': '2'}, {'font': []}],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean'], ['code-block']
        ],
    },
    clipboard: {
        matchVisual: false,
    },
}

  

formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underLine',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
]
componentDidMount(){
    axios.get("api/categorias")
    .then(res=>{
        this.setState({categorias:res.data
        })
    })

}
noticiasTitle = (value) => {
    this.setState( {
        noticias: {
            ...this.state.noticias,
            titular:value
        }
    })
}

onNewsContent = (value) => {
    this.setState( {
        noticias: {
            ...this.state.noticias,
            Contenido:value
        }
    })
}
onChangeResumen = (value) => {
    this.setState( {
        noticias: {
            ...this.state.noticias,
            Resumen:value
        }
    })
}
onChangePortada = (value) => {
    this.setState( {
        noticias: {
            ...this.state.noticias,
            Portada:value
        }
    })
}

onNewsPublish = (value) => {
    this.setState( {
        noticias: {
            ...this.state.noticias,
            isPublish:value==='True'
        }
    })
}
obtenerImagen=(e)=>{
    let file=e.target.files[0];
    let quill=this.quill.getEditor();
    const reader=new FileReader();
    reader.addEventListener("load",()=>{
        this.onChangePortada(reader.result);
        
    },false);

    if(file){
        reader.readAsDataURL(file);
    }
}
validacion=()=>{
    if(!(this.state.noticias.titular)){
        this.setState({titularError:'Debe ingresar el titular de la noticia.'})
        return false;
    }
    else if(!(this.state.noticias.Resumen)){
        this.setState({ResumenError:'Debe ingresar el Resumen  de la noticia.,de maximo 500 caracteristicas'})
        return false;
    }
    var Portada=document.querySelector('input[type=file]').files[0];
    if(Portada==null){
        this.setState({ResumenError:'Debe ingresar la imagen de Portada para la noticia'})
        return false;
    }
    return true;
}

crearNoticia =(e)=>{
    e.preventDefault();
    if(!this.validacion()){
        return;
    }
    const idCategoria=parseInt(e.target.elements["idCategoria"].value);
    const noticia=this.state.noticias;
    noticia.idCategoria=idCategoria;

    axios.post("api/noticias",noticia)
    .then(()=>{
        this.setState({
            noticias:{
                titular:'',
                Portada:null,
                Resumen:'',
                Contenido:'',
                autor:'36591c3f-f623-4df9-99c8-9e7e81515742',
               
                idCategoria:0,
               
                fecha_creacion:new Date(),
                fecha_publicacion:new Date(),
                
                idEstado:1
            }
        })
    })
}


   render(){
       const{categorias,titularError,portadaError,ResumenError}=this.state;
       return (
           <Container>
               <Row>
                   <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                       <h2 className="">Nueva noticia</h2>
                       
                       <form id="editorForm" method="post" encType="multipart/form-data" onSubmit={this.crearNoticia}>

                            <FormGroup>
                                <Form.Label className="">Titular</Form.Label>
                                <Form.Control type='text' name='titular' id='titular' placeholder=''
                                        onChange={(e)=> this.noticiasTitle(e.target.value)}
                                        onInput={()=>{this.setState({titularError:''})}}
                                        value={this.state.noticias.titular}
                                        />
                                    {titularError?<div className="text-danger">{titularError}</div> :null}

                            </FormGroup>
                            <FormGroup>
                                <Form.Label className="">Resumen</Form.Label>
                                <Form.Control as='textarea' rows= '3' name='Resumen' id='Resumen' placeholder=''
                                        onChange={(e)=> this.onChangeResumen(e.target.value)}
                                        onInput={()=>{this.setState({ResumenError:''})}}
                                        value={this.state.noticias.Resumen}
                                        />
                                        {ResumenError?<div className="text-danger">{ResumenError}</div> :null}
                            </FormGroup>

                            <FormGroup>
                                <Form.Label className="">Imagen de portada</Form.Label>
                                <Form.File id="Portada" name="Portada" accept="image/*" onChange={(e)=>this.obtenerImagen(e)}
                                onInput={()=>{this.setState({portadaError:''})}}/>
                                
                            </FormGroup>
                            <Form.Group controlId="idCategoria">
                                        <Form.Label className="">Categor&iacute;a</Form.Label>
                                        <Form.Control as="select">
                                            {categorias ==null? null
                                            :categorias.map((item, index)=><option key={index} value={item.idCategoria}>{item.nombre}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                            
                                
                            
                            <FormGroup >
                                <ReactQuill id="Contenido"
                                    ref={(el)=> this.quill= el}
                                    value={this.state.noticias.Contenido}
                                    onChange={(e)=> this.onNewsContent(e)}
                                    theme='snow'
                                    modules={this.modules}
                                    formats={this.formats}
                                    />
                                     {portadaError?<div className="text-danger">{portadaError}</div> :null}
                            </FormGroup>
                        </form>
                            <FormGroup>
                                <button className="btn btn-primary" id="btnSubmit" form="editorForm" type="Submit">Guardar</button>

                            </FormGroup>
                         

                   </Col>
                   <Col xl={3} lg={3} md={4} sm={12} xs={12}>
                       {/* <Card>
                           <Card.Header>
                               Article Setting
                           </Card.Header>
                           <Card.Body>
                               <FormGroup>
                                   <Form.Label className="">Publish</Form.Label>
                                   <Form.Control as='select' name='publish' id='publish'
                                   onChange={()=> this
                                   }
                                   >                               
                                       <option>False</option>
                                       <option>True</option>
                                   </Form.Control>
                               </FormGroup>
                               <FormGroup>
                                   <Button color='danger'
                                   onClick={(
                                   >
                                       Submit
                                   </Button>
                                </FormGroup>
                           </Card.Body>
                       </Card> */}

                   </Col>
               </Row>
           </Container>
       )
   }
}
export default NewsEdition