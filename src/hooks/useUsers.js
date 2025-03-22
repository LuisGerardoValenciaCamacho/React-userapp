import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { get, post, put, remove } from "../utils/useFetch";
import { BASE_URL } from "../utils/useUtils";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [
    
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false
}

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const { handlerLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handlerAddUser = async (user) => {
        const result = user.id === 0 ? post(`${BASE_URL}/create`, user, true) : put(`${BASE_URL}/update/${user.id}`, user, true);
        result.then(response => {
            if(response.status === 401 || response.status === 403) {
                handlerLogout();
            }
            if(response.status !== 201) {
                Swal.fire("Error", response.response.data.message, "error");
                return;
            }
            dispatch({
                type: user.id === 0 ? "addUser" : "updateUser",
                payload: response.data
            })
            Swal.fire(user.id === 0 ? "Usuario creado" : "Usuario actualizado", user.id === 0 ? "El usuario ha sido creado con exito!" : "El usuario ha sido actualizado con exito!", "success")
            handlerCloseForm();
            navigate("/users")
        }).catch(error => {
            if(error.status === 401 || error.status === 403) {
                handlerLogout();
            }
            Swal.fire("Error", error.response.data.message, "error");
        });
    }

    const handlerRemoveUser = (id) => {
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                const respuesta = remove(`${BASE_URL}/delete/${id}`, true);
                respuesta.then(response => {
                    if(response.status === 401 || response.status === 403) {
                        handlerLogout();
                    }
                    dispatch({
                        type: 'removeUser',
                        payload: id,
                    });
                    Swal.fire('Usuario Eliminado!', 'El usuario ha sido eliminado con exito!', 'success')
                }).catch(error => {
                    if(error.status === 401 || error.status === 403) {
                        handlerLogout();
                    }
                    Swal.fire("Error", error.response.data.message, "error");
                });
            }
        })

    }

    const getUsers = async () => {
        const result = get(`${BASE_URL}/all`, true);
        result.then(response => {
            if(response.status === 401 || response.status === 403) {
                handlerLogout();
            }
            dispatch({
                type: "loadingUsers",
                payload: response.data
            })
        }).catch(error => {
            if(error.status === 401 || error.status === 403) {
                handlerLogout();
            }
            console.error(error.response.data.message);
            Swal.fire("Error", error.response.data.message, "error");
        })
    }

    const handlerUserSelectedForm = (user) => {
        setVisibleForm(true);
        setUserSelected({ ...user });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    }
}