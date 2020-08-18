import React ,{Component} from 'react'
import axios from 'axios'
import {Container,ButtonGroup,Button,Table} from 'react-bootstrap'
import AddEditCategoriaModal from './AddEditCategoriaModal'



export default class Categorias extends Component{
    state={
        loading:true,
        data:null,
        addCategoryOpen:false,
        editCategoryOpen:false,
        addEditCategoryNameError:'',
        selectedCategory:null,
    }
    componentDidMount(){
        axios.get("api/categorias")
        .then(res=>{
            this.setState({data:res.data,loading:false
            })
        })

    }
    closeAddCategoryModal=()=>{
        this.setState({
            addCategoryOpen:false,
            editCategoryOpen:false,
        })
    }
    addCategoryClick=()=>{
        this.setState({addCategoryOpen:true})
      
        
     
    }
    createCategory=(data)=>{
        if(!(data.nombre)){

            this.setState({addEditCategoryNameError:"Debe ingresar la categoria."})
            return;
        }
        axios.post("api/categorias",data)
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
                addCategoryOpen:false,

            })
        })

    }
    updateCategory=()=>{
        const {selectedCategory} =this.state;
        if(!(selectedCategory.nombre)){

            this.setState({addEditCategoryNameError:"Debe ingresar la categoria."})
            return;
        }
        axios.put(`api/categorias/${selectedCategory.idCategoria}`,selectedCategory)
        .then(res=>{
            this.setState({
                data:this.state.data.map(item=>(
                    item.idCategoria===selectedCategory.idCategoria ? selectedCategory:item

                    
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
                editCategoryOpen:false,

            })
        })

    }
    deleteCategoryRequested=(e)=>{
        if(window.confirm("Borrar categoria ?")){
            this.deleteCategory(parseInt(e.target.value))
        }
    }
    deleteCategory(idCategoria){
        
        axios.delete(`api/categorias/${idCategoria}`)
        .then(()=>{
            this.setState({
                 data:this.state.data.filter(item=>item.idCategoria !== idCategoria)
            })
        })

    }


    render(){
        const {loading,data,addCategoryOpen,addEditCategoryNameError,selectedCategory,editCategoryOpen}=this.state;
        return(
            <Container>
                <div className="d-flex align-items-center header">
                    <div className="flex-grow-1">
                        <h2>Categorias</h2>

                    </div>
                    <div>
                        <button className="btn btn-primary " onClick={this.addCategoryClick}>Agregar categor&iacute;a</button>
                    </div>
                </div>
                { addCategoryOpen? <AddEditCategoriaModal 
                    onClose={this.closeAddCategoryModal}
                    onAccept={this.createCategory} 
                    addEditCategoryNameError={addEditCategoryNameError}
                    onCategoryNameChanged={()=>{
                        this.setState({addEditCategoryNameError:''})
                    }}
                        />:null}
                
                { editCategoryOpen? <AddEditCategoriaModal 
                    categoryName={selectedCategory.nombre}
                    onClose={this.closeAddCategoryModal}
                    onAccept={this.updateCategory} 
                    addEditCategoryNameError={addEditCategoryNameError}
                    onCategoryNameChanged={(e)=>{
                        this.setState({addEditCategoryNameError:'',
                        selectedCategory:{...selectedCategory,nombre:e.target.value}
                    })
                    }}
                        />:null}
                
                <Table className="table" >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th style={{width:"154px"}}></th>

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
                            <ButtonGroup>
                                <Button className="btn btn-secondary" onClick={()=>{
                                    this.setState({
                                        selectedCategory:item,
                                        editCategoryOpen:true

                                    })
                                }}>Editar</Button>
                                <Button className="btn btn-danger" onClick={this.deleteCategoryRequested} value={item.idCategoria}>
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