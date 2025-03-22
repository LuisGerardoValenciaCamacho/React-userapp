import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserRoutes } from './routes/UserRoutes'
import { LoginPage } from './auth/pages/LoginPage'
import { AuthContext } from './auth/context/AuthContext'

export const AppRoutes = () => {

    const { login, handlerLogin } = useContext(AuthContext);
    return (
        <Routes>
        {
            login.isAuth
                ? (
                    <Route path='/*' element={<UserRoutes />} />
                )
                : <>
                    <Route path='/login's
                        element={<LoginPage />} />
                    <Route path='/*' element={<Navigate to="/login" /> }  />
                </>
                
        }
        </Routes>
    )
}
