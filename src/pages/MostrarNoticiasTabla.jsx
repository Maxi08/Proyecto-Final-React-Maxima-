import React,{Component,Container} from 'react'
import axios from 'axios'
import {Table,ButtonGroup,Button} from 'react-bootstrap'
import AddEditNoticiaModal from './AddEditNoticiaModal'
 import {getjwt} from '../components/helper/jasonWebToken'
 import { render } from '@testing-library/react'


export default class MostrarNoticiasTabla extends Component{
   
    componentDidMount(){

        const jwt=getjwt();
        const AuthStr='Bearer'.concat(jwt);
        console.log(AuthStr)
        axios.get("api/noticias/getnoticiasByUser",{
            headers:{
                Authorization:AuthStr
            }
        })
        .then(res=>{
            this.setState({data:res.data})
        })
        .catch(e=>{
            console.log("error")

        })
        .finally(()=>{
            this.setState({loading:false})
            console.log(this.state.data)
        })
   }
//    state={
//     loading:true,
//     data:null,
//     addnoticiaopen:false,
//     editnoticiaopen:false,
    
//     selectednoticia:null,

// componentDidMount(){
//     axios.get("api/noticias/getallnoticias")
//     .then(res=>{
//         this.setState({data:res.data,loading:false
//         })
//     })

// }
// closeAddnoticiaModal=()=>{
//     this.setState({
//         addnoticiapen:false,
//         editnoticiaopen:false,
//     })
// }
// addnoticiaClick=()=>{
//     this.setState({addnoticiaopen:true})
  
    
 
// }

// updateCategory=(e)=>{
//     e.preventDefault();
//     const {selectednoticia} =this.state;
  
//     axios.put(`api/noticias/${selectednoticia.idNoticia}`,selectednoticia)
//     .then(res=>{
//         this.setState({
//             data:this.state.data.map(item=>(
//                 item.idNoticia===selectednoticia.idNoticia ? selectednoticia:item

                
//             ))
    
            
//         })

//     }).catch(err=>{
//         if(err===400){
//             alert("Los datos ingresados no son validos")
//         }
//         else{
//             alert("error")
//         }
//     })
//     .finally(()=>{
//         this.setState({
//             editnoticiaopen:false,

//         })
//     })

// }
// deletenoticiaRequested=(e)=>{
//     if(window.confirm("Borrar noticia ?")){
//         this.deletenoticia(parseInt(e.target.value))
//     }
// }
// deletenoticia(idNoticia){
    
//     axios.delete(`api/noticias/${idNoticia}`)
//     .then(()=>{
//         this.setState({
//              data:this.state.data.filter(item=>item.idNoticia !== idNoticia)
//         })
//     })

// }

    // render(){
    //     const {loading,data,addnoticiaopen,selectednoticia,editnoticiaopen}=this.state;
        
    //     return(
    //         <Container>
          
    //            <div>

    //            </div>


    //         </Container>
               

    //     )
    // }
}