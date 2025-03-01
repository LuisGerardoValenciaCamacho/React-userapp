import { useContext, useReducer } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/hooks/useAuth';
import { LoginPage } from './auth/pages/LoginPage';
import { UserRoutes } from './routes/UserRoutes';
import { AuthContext } from './auth/context/AuthContext';

export const UsersApp = () => {

    const { login, handlerLogin } = useContext(AuthContext);

    return (
        <Routes>
            {
                login.isAuth
                    ? (
                        <Route path='/*' element={<UserRoutes />} />
                    )
                    : <>
                        <Route path='/login'
                            element={<LoginPage />} />
                        <Route path='/*' element={<Navigate to="/login" /> }  />
                    </>
                    
            }
        </Routes>
    );
}