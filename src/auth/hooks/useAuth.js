import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}
export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = ({ username, password }) => {
        const respuesta = loginUser({ username, password });
        respuesta.then(response => {
            const claims = JSON.parse(window.atob(response.data.token.split(".")[1]));
            const user = { username: claims.username }
            dispatch({
                type: 'login',
                payload: {
                    user,
                    isAdmin: claims.isAdmin
                },
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));
            sessionStorage.setItem("token", response.data.token)
            navigate('/users');
        }).catch(err => {
            if(err.status === 401) {
                Swal.fire('Error Login', `Error al iniciar sesión: Contraseña o usuario incorrecto`, 'error');
                return;
            }
            Swal.fire('Error Login', `Error al iniciar sesión: ${err}`, 'error');
        })
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('login');
        sessionStorage.removeItem("token");
        sessionStorage.clear();
    }
    return {
        login,
        handlerLogin,
        handlerLogout,
    }
}