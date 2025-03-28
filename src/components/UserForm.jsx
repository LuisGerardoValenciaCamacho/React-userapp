import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { useUsers } from "../hooks/useUsers";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { handlerAddUser, initialUserForm } = useUsers();
    const [userForm, setUserForm] = useState(initialUserForm);
    const [checked, setChecked] = useState(userForm.admin);
    const { id, username, password, email, admin } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: '',
        });
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        // console.log(target.value)
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || (!password && id === 0) || !email) {
            Swal.fire('Error de validacion', 'Debe completar los campos del formulario!', 'error');
            return;
        }
        if (!email.includes('@')) {
            Swal.fire('Error de validacion email', 'El email debe ser valido, incluir un @!', 'error');
            return;
        }
        handlerAddUser(userForm);
        setUserForm(initialUserForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    const onCheckboxChange = (event) => {
        setChecked(!checked)
        setUserForm({
            ...userForm,
            admin: checked
        })
    }

    return (
        <form onSubmit={ onSubmit }>
            <input className="form-control my-3 w-75" placeholder="Username" name="username" value={ username} onChange={onInputChange} />
            
            { 
                id > 0 || 
                <input className="form-control my-3 w-75" placeholder="Password" type="password" name="password" value={password} onChange={onInputChange} /> 
            }
            <input className="form-control my-3 w-75" placeholder="Email" name="email" value={email} onChange={onInputChange} />
            <div className="my-3 form-check">
                <label>Administrador</label>
                <input type="checkbox" className="form-check-input" name="admin" checked={admin} onChange={onCheckboxChange}/>
            </div>
            <input type="hidden" name="id" value={id} />
            
            <button className="btn btn-primary" type="submit"> {id > 0 ? 'Editar' : 'Crear'}</button>
            {
                !handlerCloseForm || 
                <button className="btn btn-primary mx-2" type="button" onClick={() => onCloseForm()}>Cerrar</button>
            }
        </form>
    )
}