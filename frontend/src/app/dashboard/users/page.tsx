'use client'

import useGetAllUsers from "@/hooks/useGetAllUsers"
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { formatDate } from "@/utils/formatDate";

const UsersPage = () => {
    const { users, error, loading } = useGetAllUsers()
    const { hasAccess } = useProtectedRoute(['admin', 'staff'])

    if (!hasAccess) {
        return null;
    }

    return (
        <div>
            {error && (<h3>{error}</h3>)}
            {loading
                ? <p>Loading user data.....</p>
                : (
                    <ul>
                        {users.map((user) => (
                            <li key={user._id}>
                                <h3>Email: {user.email}</h3>
                                <p>Role: {user.role}</p>
                                <small> Created: {formatDate(user.createdAt)}</small>
                                <small> Updated: {formatDate(user.updatedAt)}</small>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div >
    );
}

export default UsersPage