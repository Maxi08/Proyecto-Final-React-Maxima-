import React ,{Component} from 'react'
import axios from 'axios'
import {Container,Form,FormGroup,ButtonGroup,Button,Table} from 'react-bootstrap'
import UsuarioRegistroEstandarModal from './UsuarioRegistroEstandarModal'
import '../pages/style.css'
import qs from 'qs'
import {Redirect} from 'react-router-dom'



export default class LoginUsuarioRegistroEstandar extends Component{
   constructor(props){
       super(props);
       let loggedIn=false;
       this.state={
            user:{
            username:'',
            password:'',
            grant_type:'password'
    
            },
            loggedIn,
            addUsuarioError:{
                EmailError:'',
                passwordError:''

            }
           
       }
       
   }
   login=(e)=>{
        e.preventDefault();
        if(!this.validarUsuario()){
            return;
        }

        let data = qs.stringify({
            grant_type: "password",
            username: this.state.user.username,
            password: this.state.user.password
        },
            {encode: false}
        );
        let config={
            method: "post",
            url:"token",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };

        axios(config)
        .then(res=>{
            localStorage.setItem('jwt', res.data.access_token);
            console.log(res.data);
            this.setState({loggedIn: true})
        })
        .catch(err=>{
            if(err.response.status === 400)
                alert("Los datos ingresados no son validos.")
            else
                alert(err.response.message)
        })
        .finally(()=>{
            this.setState({
                user:{
                    username:'',
                    password:'',
                    grant_type:'password'
                }
            })
        })
    } 

    validarUsuario=()=>{
        if(!(this.state.user.username ) ){

            this.setState({addUsuarioError:{
                ...this.state.addUsuarioError,
                EmailError:'este campo es requerido'
            }
            })
            
            return false;
        }
      
        else if(!(this.state.user.password ) ){

            this.setState({addUsuarioError:{
                ...this.state.addUsuarioError,
                contraseñaError:'este campo es requerido'
            }
            })
            
            return false;
        }
           
        
        
        return true;
    }
   
    onChangeEmail = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                username:value
            }
        })
    }
    onChangeContraseña = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                password:value
            }
        })
    }
   
   


    render(){
        if(this.state.loggedIn){
            return <Redirect to="/noticias"></Redirect>
        }
        const {addUsuarioError}=this.state;
        return(
            <Container>
              

                <form id="userForm" method="post"  onSubmit={this.login}>
                <div className="d-flex align-items-center header">
                    <div className="flex-grow-1">
                        <h2>Login </h2>

                    </div>
                </div>

                    <FormGroup  controlId="Email">
                        <Form.Label className="">Email</Form.Label>
                        <Form.Control type='Email'   placeholder=''
                                onChange={(e)=> this.onChangeEmail(e.target.value)}
                                onInput={()=>this.setState({addUsuarioError:{...this.setState.addUsuarioError, EmailError:''}})}
                                value={this.state.user.username}
                                />
                                {addUsuarioError.EmailError?<div className="text-danger">{addUsuarioError.EmailError}</div> :null}
                    </FormGroup>

                    <FormGroup controlId="Password">
                        <Form.Label className="">Contraseña</Form.Label>
                        <Form.Control type='password'   placeholder=''
                                onChange={(e)=> this.onChangeContraseña(e.target.value)}
                                onInput={()=>this.setState({addUsuarioError:{...this.setState.addUsuarioError,contraseñaError:''}})}
                                value={this.state.user.password}
                                />
                                {addUsuarioError.contraseñaError?<div className="text-danger">{addUsuarioError.contraseñaError}</div> :null}
                    </FormGroup>
                    <FormGroup>
                        <button className="btn btn-primary" id="btnSubmit" form="userForm" type="Submit">Entra</button>

                 </FormGroup>

          
                </form>
                            
            </Container>
           
        )
    }
}

