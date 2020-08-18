import React ,{Component} from 'react'
import axios from 'axios'
import {Container,Form,FormGroup,ButtonGroup,Button,Table} from 'react-bootstrap'
import UsuarioRegistroEstandarModal from './UsuarioRegistroEstandarModal'
import '../pages/style.css';



export default class UsuarioRegistroEstandar extends Component{
    state={
       
        user:{
        Email:'',
        Password:'',
        ConfirmPassword:'',
        Rol:'Estandar'

        },
        addUsuarioError:{
            EmailError:'',
            contraseñaError:'',
            confirmarContraseñaError:'',
            rolError:''

        }

        
        
    }
  

    validarUsuario=()=>{
        if(!(this.state.user.Email ) ){

            this.setState({addUsuarioError:{
                ...this.state.addUsuarioError,
                EmailError:'este campo es requerido'
            }
            })
            
            return false;
        }
      
        else if(!(this.state.user.Password ) ){

            this.setState({addUsuarioError:{
                ...this.state.addUsuarioError,
                contraseñaError:'este campo es requerido'
            }
            })
            
            return false;
        }
        else if(!(this.state.user.ConfirmPassword ) ){

            this.setState({addUsuarioError:{
                ...this.state.addUsuarioError,
                confirmarContraseñaError:'este campo es requerido'
            }
            })
            
            return false;
        }

     
        
        
        return true;
    }
    createUser=(e)=>{
        e.preventDefault();
        if(!this.validarUsuario()){
            return;
        }
        console.log(this.state.user);
        
        axios.post("api/account/register",this.state.user)
        .then(()=>{
            this.setState({
                user:{
                    Email:'',
                    Password:'',
                    ConfirmPassword:'',
                    Rol:'Estandar'
            
                }
        
                
            })

        }).catch(err=>{
            if(err===400){
                alert("Los datos ingresados no son validos")
            }
            else{
                alert("error")
            }
        })
        .finally(()=>{
            this.setState({
               

            })
        })

    }
    onChangeEmail = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                Email:value
            }
        })
    }
    onChangeContraseña = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                Password:value
            }
        })
    }
    onChangeConfirmContraseña = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                ConfirmPassword:value
            }
        })
    }
   


    render(){
        const {addUsuarioError}=this.state;
        return(
            <Container>
                

                <form id="userForm" method="post"  onSubmit={this.createUser}>
                    <div className="d-flex align-items-center header">
                        <div className="flex-grow-1">
                            <h2>Registro de usuarios</h2>

                        </div>
                    </div>

                    <FormGroup  controlId="Email">
                        <Form.Label className="">Email</Form.Label>
                        <Form.Control type='Email'   placeholder=''
                                onChange={(e)=> this.onChangeEmail(e.target.value)}
                                onInput={()=>{this.setState({addUsuarioError:{...this.setState.addUsuarioError, EmailError:''}})}}
                                value={this.state.user.Email}
                                />
                                {addUsuarioError.EmailError?<div className="text-danger">{addUsuarioError.EmailError}</div> :null}
                    </FormGroup>

                    <FormGroup controlId="Password">
                        <Form.Label className="">Contraseña</Form.Label>
                        <Form.Control type='password'   placeholder=''
                                onChange={(e)=> this.onChangeContraseña(e.target.value)}
                                onInput={()=>{this.setState({addUsuarioError:{...this.setState.addUsuarioError,contraseñaError:''}})}}
                                value={this.state.user.Password}
                                />
                                {addUsuarioError.contraseñaError?<div className="text-danger">{addUsuarioError.contraseñaError}</div> :null}
                    </FormGroup>

                    <FormGroup controlId="ConfirmPassword">
                        <Form.Label className="">Confirmar contraseña</Form.Label>
                        <Form.Control type='password'   placeholder=''
                                onChange={(e)=> this.onChangeConfirmContraseña(e.target.value)}
                                onInput={()=>{this.setState({addUsuarioError:{...this.setState.addUsuarioError,confirmarContraseñaError:''}})}}
                                value={this.state.user.ConfirmPassword}
                                />
                                {addUsuarioError.confirmarContraseñaError?<div className="text-danger">{addUsuarioError.confirmarContraseñaError}</div> :null}
                    </FormGroup>

                    <FormGroup>
                        <button className="btn btn-primary" id="btnSubmit" form="userForm" type="Submit">Registrarse</button>

                    </FormGroup>


          
                </form>
           
                              

            </Container>
           
        )
    }

}