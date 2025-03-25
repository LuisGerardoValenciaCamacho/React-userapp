import { Navigate, Route, Routes } from 'react-router-dom'
import { UserRoutes } from './routes/UserRoutes'
import { LoginPage } from './auth/pages/LoginPage'
import { useAuth } from './auth/hooks/useAuth'

export const AppRoutes = () => {

    const { login } = useAuth();
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
