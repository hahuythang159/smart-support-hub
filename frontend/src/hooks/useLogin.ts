import { loginService } from "@/services/auth.service"
import { localStorageStrategy, sessionStorageStrategy } from "@/services/storage.strategy"
import { loginSuccess } from "@/store/authSlice"
import { LoginForm } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogin = async (form: LoginForm, stayLoggedIn: boolean) => {
        setError(null)
        setLoading(true)
        try {
            const data = await loginService(form)
            const strategy = stayLoggedIn ? localStorageStrategy : sessionStorageStrategy
            strategy.setToken(data.token)

            dispatch(loginSuccess({ token: data.token }))
            router.push('/')
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }
    return { error, loading, handleLogin }
}