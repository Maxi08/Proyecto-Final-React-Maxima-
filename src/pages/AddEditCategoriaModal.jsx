import React from 'react'


export default function AddEditCategoriaModal({onClose,onAccept,AddEditCategoryNameError,onCategoryNameChanged,categoryName}){

    const  categoryNameHasError=AddEditCategoryNameError !==''

    const onAddEditCategorySubmit=(e)=>{
        e.preventDefault();
        const categoryName=e.target.elements["categoryName"].value;
        onAccept({
            nombre:categoryName
        })

    }

    return(
        <div className="modal fade show"  style={{display:'block'}} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Agrega y edita las categorias</h5>
                    <button type="button" className="close" onClick={onClose}  data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form className='form-group' id="addEditCategoryForm" onSubmit={onAddEditCategorySubmit} method="post">
                        <div className="form-Group ">
                        
                            <label htmlFor="categoryName">Nombre categoria</label>
                            <input name="categoryName" className={categoryNameHasError ? 'form-control is-invalid': 'form-control'}
                             onChange={onCategoryNameChanged}
                             value={categoryName}/>
                           
                            {categoryNameHasError ?
                            <div className='invalid-feedback'>
                               {AddEditCategoryNameError} Debes llenar el campo!

                            </div>
                            :null}

                        </div>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose} data-dismiss="modal">Close</button>
                    <button type="Submit" className="btn btn-primary" form="addEditCategoryForm">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}
