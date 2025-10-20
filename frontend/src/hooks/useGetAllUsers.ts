import { getAllUsers } from "@/services/users.service"
import { RootState } from "@/store/store"
import { Users } from "@/types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useGetAllUsers = () => {
    const [users, setUsers] = useState<Users>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const token = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        if (token) {
            loadAllUsers(token)
        } else {
            setError('Token is invalid or expired.')
        }
    }, [token])

    const loadAllUsers = async (token: string) => {
        setError(null)
        setLoading(true)

        try {
            const users = await getAllUsers(token)
            setUsers(users)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Falied to load all users. Please try agian!')
            }
        } finally {
            setLoading(false)
        }
    }
    return { users, error, loading }
}

export default useGetAllUsers