import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { AuthContext } from "../auth/context/AuthContext"

export const UserRow = ({ id, username, email, admin}) => {

    const { handlerUserSelectedForm, handlerRemoveUser } = useContext(UserContext);
    const { login } = useContext(AuthContext);
    
    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>
                {
                    login.isAdmin
                    ? <button type="button" className="btn btn-secondary btn-sm" onClick={() => handlerUserSelectedForm({ id, username, email, admin })}>Update</button>
                    : null
                }
            </td>
            <td>
                {
                    login.isAdmin
                    ? <NavLink className={'btn btn-secondary btn-sm'} to={'/users/edit/' + id} >Update route</NavLink>
                    : null
                }
            </td>
            <td>
                {
                    login.isAdmin
                    ? <button type="button" className="btn btn-danger btn-sm" onClick={() => handlerRemoveUser(id)}>Remove</button>
                    : null
                }
            </td>
        </tr>
    )
}