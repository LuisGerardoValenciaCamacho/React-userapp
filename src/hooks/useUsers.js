import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { get, post, put, remove } from "../utils/useFetch";
import { BASE_URL } from "../utils/useUtils";
import { useDispatch, useSelector } from "react-redux";
import { addUser, initialUserForm, loadingUsers, onCloseForm, onOpenForm, onUserSelectedForm, removeUser, updateUser } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers = () => {
    const { users, userSelected, visibleForm } = useSelector(state => state.users);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const { handlerLogout } = useAuth();

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
            if(user.id == 0) {
                dispatch(addUser(response.data))
            } else {
                dispatch(updateUser(response.data))
            }
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
                    dispatch(removeUser(id))
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
            dispatch(loadingUsers(response.data));
        }).catch(error => {
            if(error.status === 401 || error.status === 403) {
                handlerLogout();
            }
            Swal.fire("Error", error.response.data.message, "error");
        })
    }

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm(user));
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
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