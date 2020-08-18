import React from 'react'



export default function RegistroLoginModal ({onClose,onAccept,addEditUsuarioError,onNombreChanged,
    onApellidoChanged,onEmailChanged,onContraseñaChanged,onRolChanged,nombre,apellido,email,contraseña,rol}){

   

    const onAddEditUserSubmit=(e)=>{
        e.preventDefault();
       
        const nombre=e.target.elements["nombre"].value;
        const apellido=e.target.elements["apellido"].value;
        const email=e.target.elements["email"].value;
        const contraseña=e.target.elements["contraseña"].value;
        const rol=e.target.elements["rol"].value;
        onAccept({
           
            nombre:nombre,
            apellido:apellido,
            email:email,
            contraseña:contraseña,
            rol:rol
        })

    }

    return(
        <div className="modal fade show"  style={{display:'block'}} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Agrega y edita los usuarios</h5>
                    <button type="button" className="close" onClick={onClose}  data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form className='form-group' id="addEditUserForm" onSubmit={onAddEditUserSubmit} method="post">
                        <div className="form-Group ">

                           
                        
                            <label htmlFor="nombre">Nombre </label>
                            <input name="nombre" className={addEditUsuarioError.nombreError ? 'form-control is-invalid': 'form-control'}
                             onChange={onNombreChanged}
                             value={nombre}/>
                           
                            {addEditUsuarioError.nombreError ?
                            <div className='invalid-feedback'>
                               {addEditUsuarioError.nombreError} Debes llenar el campo!

                            </div>
                            
                            :null}

                            <label htmlFor="apellido">Apellido </label>
                            <input name="apellido" className={addEditUsuarioError.apellidoError ? 'form-control is-invalid': 'form-control'}
                             onChange={onApellidoChanged}
                             value={apellido}/>
                           
                            {addEditUsuarioError.apellidoError?
                            <div className='invalid-feedback'>
                               {addEditUsuarioError.apellidoError} Debes llenar el campo!

                            </div>
                            
                            :null}

                            <label htmlFor="email">Email</label>
                            <input name="email" type="email" className={addEditUsuarioError.emailError ? 'form-control is-invalid': 'form-control'}
                             onChange={onEmailChanged}
                             value={email}/>
                           
                            {addEditUsuarioError.emailError ?
                            <div className='invalid-feedback'>
                               {addEditUsuarioError.emailError} Debes llenar el campo!

                            </div>
                            
                            :null}
                          
                          <label htmlFor="contraseña">Contraseña </label>
                            <input name="contraseña"  type="password" className={addEditUsuarioError.contraseñaError ? 'form-control is-invalid': 'form-control'}
                             onChange={onContraseñaChanged}
                             value={contraseña}/>
                           
                            {addEditUsuarioError.contraseñaError ?
                            <div className='invalid-feedback'>
                               {addEditUsuarioError.contraseñaError} Debes llenar el campo!

                            </div>
                             :null}    
                            
                         
                          
                          <label htmlFor="rol">Rol </label>
                          <select name="rol" id="rol" className="form-control" value={rol} onChange={onRolChanged}>
                                <option value="1">Estandar</option>
                                <option value="2">Editor</option>
                                <option value="3">Administrador</option>
                               
                            </select>
                            
                                                                      

                                

                         
                        </div>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose} data-dismiss="modal">Close</button>
                    <button type="Submit" className="btn btn-primary" form="addEditUserForm">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}
