import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";

export const useAuth = () => {

    const { login } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerLogin = ({ username, password }) => {
        const respuesta = loginUser({ username, password });
        respuesta.then(response => {
            const claims = JSON.parse(window.atob(response.data.token.split(".")[1]));
            const user = { username: claims.username }
            dispatch(onLogin({user, isAdmin: claims.isAdmin}))
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
        dispatch(onLogout());
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