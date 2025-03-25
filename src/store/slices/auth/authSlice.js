import { createSlice, isAction } from "@reduxjs/toolkit";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: initialLogin
    },
    reducers: {
        onLogin: (state, action) => {
            state.login = {
                isAuth: true,
                isAdmin: action.payload.isAdmin,
                user: action.payload.user
            }
        },
        onLogout: (state, action) => {
            state.login = {
                isAuth: false
            }
        }
    }
})

export const {
    onLogin,
    onLogout
} = authSlice.actions;