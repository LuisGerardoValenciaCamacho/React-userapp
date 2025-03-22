import { UserRow } from "./UserRow"
import { useUsers } from "../hooks/useUsers"

export const UsersList = () => {

    const { users } = useUsers()

    return (
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>email</th>
                    <th>update</th>
                    <th>update route</th>
                    <th>remove</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(({id, username, email, admin }) => (
                        <UserRow key={id} id={id} username={username} email={email} admin={admin} />
                    ))
                }
            </tbody>
        </table>
    )
}