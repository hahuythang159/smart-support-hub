import { changePasswordService } from "@/services/users.service"
import { RootState } from "@/store/store"
import { ChangePasswordRequest } from "@/types"
import { useState } from "react"
import { useSelector } from "react-redux"

const useChangePassword = () => {
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const token = useSelector((state: RootState) => state.auth.token)

    const changePassword = async (form: ChangePasswordRequest) => {
        if (!token) {
            setError('Token not found')
            return;
        }

        setSuccess(null)
        setError(null)
        setLoading(true)

        try {
            const res = await changePasswordService(token, form)
            setSuccess(res.message || 'Change password success!')
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Failed to change your password')
            }
        } finally {
            setLoading(false)
        }
    }

    return { success, error, loading, changePassword }
}

export default useChangePassword