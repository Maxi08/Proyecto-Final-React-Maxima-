
import React ,{Component} from 'react'
import axios from 'axios'
import {Container,ButtonGroup,Button,Table} from 'react-bootstrap'
import RegistroLoginModal from './RegistroLoginModal'



export default class Usuarios extends Component{
    state={
        loading:true,
        data:null,
        addUserOpen:false,
        editUserOpen:false,
        addEditUsuarioError:{

            nombreError:'',
            apellidoError:'',
            emailError:'',
            contraseñaError:'',
            rolError:''
        },
        selectedUser:null,
    }
    componentDidMount(){
        axios.get("api/usuarios")
        .then(res=>{
            this.setState({data:res.data,loading:false
            })
        })

    }
    closeAddUserModal=()=>{
        this.setState({
            addUserOpen:false,
            editUserOpen:false,
        })
    }
    addUserClick=()=>{
        this.setState({addUserOpen:true})
      
        
     
    }
    validarUsuario=(usuario)=>{
        if(!(usuario.nombre ) ){

            this.setState({addEditUsuarioError:{
                ...this.setState.addEditUsuarioError,
                nombreError:'este campo es requerido'
            }
            })
            
            return false;
        }
        else if(!(usuario.apellido ) ){

            this.setState({addEditUsuarioError:{
                ...this.setState.addEditUsuarioError,
                apellidoError:'este campo es requerido'
            }
            })
            
            return false;
        }
        else if(!(usuario.email ) ){

            this.setState({addEditUsuarioError:{
                ...this.setState.addEditUsuarioError,
                emailError:'este campo es requerido'
            }
            })
            
            return false;
        }
        else if(!(usuario.contraseña ) ){

            this.setState({addEditUsuarioError:{
                ...this.setState.addEditUsuarioError,
                contraseñaError:'este campo es requerido'
            }
            })
            
            return false;
        }
        else if(!(usuario.rol ) ){

            this.setState({addEditUsuarioError:{
                ...this.setState.addEditUsuarioError,
                rolError:'este campo es requerido'
            }
            })
            
            return false;
        }
        return true;
    }
    createUser=(data)=>{
        if(!this.validarUsuario(data)){
            return;
        }
        
        axios.post("api/usuarios",data)
        .then(res=>{
            this.setState({
                data:[...this.state.data,res.data]
        
                
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
                addUserOpen:false,

            })
        })

    }
    updateUser=()=>{
        const {selectedUser} =this.state;
        if(!this.validarUsuario(selectedUser)){
            return;
        }
        
        axios.put(`api/usuarios/${selectedUser.idUsuario}`,selectedUser)
        .then(res=>{
            this.setState({
                data:this.state.data.map(item=>(
                    item.idUsuario===selectedUser.idUsuario ? selectedUser:item

                    
                ))
        
                
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
                editUserOpen:false,

            })
        })

    }
    deleteUserRequested=(e)=>{
        if(window.confirm("Borrar usuario ?")){
            this.deleteUser(parseInt(e.target.value))
        }
    }
    deleteUser(idUsuario){
        
        axios.delete(`api/usuarios/${idUsuario}`)
        .then(()=>{
            this.setState({
                 data:this.state.data.filter(item=>item.idUsuario !== idUsuario)
            })
        })

    }


    render(){
        const {loading,data,addUserOpen,addEditUsuarioError,selectedUser,editUserOpen}=this.state;
        return(
            <Container>
                <div className="d-flex align-items-center header">
                    <div className="flex-grow-1">
                        <h2>Registro de usuarios</h2>

                    </div>
                    <div>
                        <button className="btn btn-primary " onClick={this.addUserClick}>Agregar usuarios</button>
                    </div>
                </div>
                { addUserOpen? <RegistroLoginModal 
                    onClose={this.closeAddUserModal}
                    onAccept={this.createUser} 
                    addEditUsuarioError={addEditUsuarioError}
                    onNombreChanged={()=>{
                        this.setState({addEditUsuarioError:{
                           ...this.state.addEditUsuarioError,nombreError:''

                        }})    
                    }}
                    onApellidoChanged={()=>{
                        this.setState({addEditUsuarioError:{
                           ...this.state.addEditUsuarioError,apellidoError:''

                        }})    
                    }}
                    onEmailChanged={()=>{
                        this.setState({addEditUsuarioError:{
                           ...this.state.addEditUsuarioError,emailError:''

                        }})    
                    }}
                    onContraseñaChanged={()=>{
                        this.setState({addEditUsuarioError:{
                           ...this.state.addEditUsuarioError,contraseñaError:''

                        }})    
                    }}
                   


                        />:null}
                
                { editUserOpen? <RegistroLoginModal
                   
                    nombre={selectedUser.nombre}
                    apellido={selectedUser.apellido}
                    email={selectedUser.email}
                    contraseña={selectedUser.contraseña}
                    rol={selectedUser.rol}
                    onClose={this.closeAddUserModal}
                    onAccept={this.updateUser} 
                    addEditUsuarioError={addEditUsuarioError}

                    onNombreChanged={(e)=>{
                        this.setState({addEditUsuarioError:{
                           ...this.state.addEditUsuarioError,nombreError:''

                        },selectedUser:{...selectedUser,nombre:e.target.value}
                    })    
                    }}
                    onApellidoChanged={(e)=>{
                        this.setState({addEditUsuarioError:{
                           ...this.state.addEditUsuarioError,apellidoError:''

                        },selectedUser:{...selectedUser,apellido:e.target.value}
                    })    
                    }}
                    onEmailChanged={(e)=>{
                        this.setState({addEditUsuarioError:{
                           ...this.state.addEditUsuarioError,emailError:''

                        },selectedUser:{...selectedUser,email:e.target.value}
                    })    
                    }}
                    onContraseñaChanged={(e)=>{
                        this.setState({addEditUsuarioError:{
                           ...this.state.addEditUsuarioError,contraseñaError:''

                        },selectedUser:{...selectedUser,contraseña:e.target.value}
                    })    
                    }}
                    onRolChanged={(e)=>{
                        this.setState({
                        selectedUser:{...selectedUser,rol:parseInt(e.target.value)}
                    })    
                    }}
                   


                        />:null}
                    
                
                <Table className="table" >
                    <thead>
                        <tr>
                           
                            <th>Nombre</th>
                                                   
                            <th>Apellido</th>
                                                  
                            <th>Email</th>
                                            
                            <th>contraseña</th>
                                               
                            <th>Rol</th>
                            

                        </tr>

                    </thead>
                    <tbody>
                        {loading?
                        <tr>
                            <td>Cargando..</td>
                        </tr>
                        : data.map((item,index)=><tr key={index}>
                       
                        <td>
                            {item.nombre}
                        </td>
                        <td>
                            {item.apellido}
                        </td>
                        <td>
                            {item.email}
                        </td>
                        <td>
                            {item.contraseña}
                        </td>
                        <td>
                            {item.rol}
                        </td>
                       
                        <td>
                            <ButtonGroup>
                                <Button className="btn btn-secondary" onClick={()=>{
                                    this.setState({
                                        selectedUser:item,
                                        editUserOpen:true

                                    })
                                }}>Editar</Button>
                                <Button className="btn btn-danger" onClick={this.deleteUserRequested} value={item.idUsuario}>
                                    Eliminar

                                </Button>
                            </ButtonGroup>
                        </td>
                        </tr>)}
                    </tbody>

                </Table>

                              

            </Container>
           
        )
    }

}