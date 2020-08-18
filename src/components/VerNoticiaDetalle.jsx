import React,{Component} from 'react'
import {Container} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import parse from 'html-react-parser'
import '../pages/VerNoticiaDetalle.css'






class VerNoticiaDetalle extends Component{
    constructor(props){
        super(props);
        this.state={
            noticia:{},
            isLoaded:false,

        }
        console.log(this.props)
    }
    componentDidMount(){
        if(typeof this.props.location.state !== 'undefined'){
            if(this.props.location.state.hasOwnProperty('noticia')){
                this.setState({
                    noticia:this.props.location.state.noticia
                },()=>{
                    this.setState({
                        isLoaded:true
                    })

                })
            }
        }
    }
  
    render(){
        if(this.state.isLoaded){
            return(
                <Container>
                    <div className="Article">

                        <div className="ImageContainer">
                            <img className="Image"
                            src={this.state.noticia.Portada}
                            alt={this.state.noticia.Titular}/>
                            <div className="ArticleInfo">
                                <h1 className="Title">
                                    {this.state.noticia.Titular}
                                </h1>
                               
                            </div>
                        </div>
                        <div className="ArticleMain">
                            {parse(this.state.noticia.Contenido)}
                        </div>
                    </div>

                </Container>
            );
        }
        else{
            return (
                <div>..Cargando</div>
    
            )
        }
                                

    }
    

}

export default withRouter(VerNoticiaDetalle)