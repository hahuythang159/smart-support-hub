import { registerService } from "@/services/auth.service"
import { RegisterForm } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const useRegister = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const handleRegister = async (form: RegisterForm) => {
        setError(null)
        setLoading(true)
        try {
            await registerService(form)
            router.push('/auth/login')
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return { error, loading, handleRegister }
}