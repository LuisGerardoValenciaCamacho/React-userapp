import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { useFetch } from "../utils/useFetch";

const initialUsers = [
    {
        id: 1,
        username: 'pepe',
        password: '12345',
        email: 'pepe@correo.com'
    },
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
}

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();

    const handlerAddUser = (user) => {
        if(user.id === 0) {
            delete user.id;
            const result = useFetch("http://localhost:5500/api/user/create", "POST", user);
            result.then(response => {
                if(response.code == 200) {
                    dispatch({
                        type: 'addUser',
                        payload: user,
                    });
                    Swal.fire(
                        'Usuario Creado',
                        'El usuario ha sido creado con exito!',
                        'success'
                    );
                    handlerCloseForm();
                    setTimeout(() => {
                        navigate('/users');
                    }, 2000);
                    return;
                }
                Swal.fire("Error", response.result, "error")
                handlerCloseForm();
            });
            return;
        }
        const result = useFetch(`http://localhost:5500/api/user/update/${user.id}`, "PUT", user);
        result.then(response => {
            if(response.code == 200) {
                dispatch({
                    type: 'updateUser',
                    payload: user,
                });
                Swal.fire(
                    'Usuario Actualizado',
                    'El usuario ha sido actualizado con exito!',
                    'success'
                );
                handlerCloseForm();
                setTimeout(() => {
                    navigate('/users');
                }, 2000);
                return;
            }
            Swal.fire("Error", response.result, "error")
            handlerCloseForm();
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
                const result = useFetch(`http://localhost:5500/api/user/delete/${id}`, "DELETE");
                result.then(response => {
                    if(response.code == 200) {
                        dispatch({
                            type: 'removeUser',
                            payload: id,
                        });
                        Swal.fire(
                            'Usuario Eliminado!',
                            'El usuario ha sido eliminado con exito!',
                            'success'
                        )
                        handlerCloseForm();
                        setTimeout(() => {
                            navigate('/users');
                        }, 2000);
                        return;
                    }
                    Swal.fire("Error", response.result, "error")
                    handlerCloseForm();
                }).catch(error => {
                    console.error(error);
                });
            }
        })

    }

    const getUsers = () => {
        const result = useFetch("http://localhost:5500/api/user/all", "GET");
        result.then(response => {
            if(response.code == 200) {
                dispatch({
                    type: "loadingUsers",
                    payload: response.result
                })
                return;
            }
            Swal.fire("Error", response.result, "error")
        });
    }

    const handlerUserSelectedForm = (user) => {
        // console.log(user)
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