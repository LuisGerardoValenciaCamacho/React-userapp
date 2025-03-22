import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { AuthContext } from "../auth/context/AuthContext";
import { useUsers } from "../hooks/useUsers"

export const UsersPage = () => {

    const { users, visibleForm, handlerRemoveUser, handlerUserSelectedForm, handlerOpenForm, getUsers } = useUsers();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        getUsers();
    }, [])
        

    return (
        <>
            {!visibleForm ||
                <UserModalForm />}
            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">
                    <div className="col">
                        {visibleForm || !login.isAdmin || <button
                            className="btn btn-primary my-2"
                            onClick={handlerOpenForm}>
                            Nuevo Usuario
                        </button>}

                        {
                            users.length === 0
                                ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                                : <UsersList handlerUserSelectedForm={handlerUserSelectedForm} handlerRemoveUser={handlerRemoveUser} users={users}/>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}