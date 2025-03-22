import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false
}

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        userSelected: initialUserForm,
        visibleForm: false,
    },
    reducers: {
        addUser: (state, action) => {
            state.users = [
                ...state.users,
                { ...action.payload }
            ];
            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map(user => {
                if(user.id === action.payload.id) {
                    return { ...action.payload }
                }
                return user;
            })
            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },
        loadingUsers: (state, action) => {
            state.users = action.payload;
        },
        onUserSelectedForm: (state, action) => {
            state.visibleForm = true;
            state.userSelected(action.payload);
        },
        onOpenForm: (state, action) => {
            state.visibleForm = true;
        },
        onCloseForm: (state, action) => {
            state.visibleForm = false;
            state.userSelected = initialUserForm
        }
    }
});

export const {
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm
} = usersSlice.actions;