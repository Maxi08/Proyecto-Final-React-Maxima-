import React,{Component} from 'react';
import axios from 'axios'
import {Container,Button,Pagination} from 'react-bootstrap'
import VistaNoticias from '../components/VistaNoticias';
import CategoriasNavBar from '../components/CategoriasNavBar';
import  '../pages/style.css'
import ConfiguracionPagina from '../pages/ConfiguracionPagina';
import Pagina from '../components/Pagina';


export default class MostrarNoticias extends Component{
    state={
        
        cargando:true,
        noticias:[],
        categorias:[],
        buscar:'',
        categoriaActual:0,
        activePage:0
    }
    componentDidMount(){
        axios.get("api/noticias")
        .then(res=>{
            this.setState({noticias: res.data})
    })
    axios.get("api/categorias")
    .then(res=>{
        this.setState({categorias: res.data})
    })
    .finally(()=>{
        this.setState({cargando:false})
    });
    }
    onCategoriaSeleccinada=(idCategoria)=>{
        this.setState({cargando:true,categoriaActual:idCategoria})
        axios.get("api/noticias/getallnoticias")
        .then(res=>{
            this.setState({noticias:res.data.filter(item=>
                item.idCategoria===idCategoria)})
        })
        .finally(()=>{
            this.setState({cargando:false})
        })
    }
    buscarNoticias=(e)=>{
        e.preventDefault()
        this.setState({cargando:true,categoriaActual:0})
        axios.get("api/noticias/getallnoticias")
        .then(res=>{
            this.setState({noticias:res.data.filter(item=>item.titular.toLowerCase().includes(this.state.buscar))})
        })
        .finally(()=>{
            this.setState({cargando:false})
        });
    }
    deleteRequested=(e)=>{
        if(window.confirm("Borrar noticia?")){
            this.deleteNoticia(parseInt(e.target.value))
        }
    }
    deleteNoticia(idNoticia){
        
        axios.delete(`api/noticias/${idNoticia}`)
        .then(()=>{
            this.setState({
                 data:this.state.data.filter(item=>item.idNoticia !== idNoticia)
            })
        })

    }

    render(){
        const {noticias, cargando,categorias,buscar,categoriaActual,activePage}=this.state;
        return (
            <Container className="container">


                <div className="menuCategoria">
                    <CategoriasNavBar categorias={categorias} categoriaSeleccionada={this.onCategoriaSeleccinada}
                    categoriaActual={categoriaActual}>

                    </CategoriasNavBar>
                </div>
                <div>
                    <form onSubmit={this.buscarNoticias} className="formSearch">
                        <input  value={this.state.buscar} className="form-control txtSearch" 
                            onChange={(event)=>{
                                this.setState({buscar:event.target.value})
                            }}
                        />
                        <Button type="submit" variant="dark" >
                        <span>Buscar</span>
                        </Button>
                    </form>
                </div>


                {cargando?"Cargando...":noticias.map((item,index)=><div  key={index}>
                <VistaNoticias
                noticia={item}></VistaNoticias>
                  </div>)}
                  <div className="paginacion">
                      {<Pagina activePage={activePage} onSelectedPage={this.goTopage}/>}

                  </div>

            </Container>
        )

    }
    goTopage=(page)=>{
        this.setState({activePage:page})
        let numpag=page;
        if(numpag==1){
            numpag=0;
        }
        axios.get(`api/noticias/?page=${page}`)
        .then(res=>{
            if(res.data !==null){
                this.setState({
                    noticias:res.data
                })

            }
        })
    }

}

