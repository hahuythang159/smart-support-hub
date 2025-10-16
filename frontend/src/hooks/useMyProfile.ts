import { getMyProfileService } from "@/services/users.service"
import { RootState } from "@/store/store"
import { User } from "@/types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useMyProfile = () => {
    const [myProfile, setMyProfile] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const token = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        if (token) {
            loadMyProfile(token)
        } else {
            setError('Token is invalid or expired.')
        }
    }, [token])

    const loadMyProfile = async (token: string) => {
        setError(null)
        setLoading(true)

        try {
            const data = await getMyProfileService(token)
            setMyProfile(data)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Falied to load your profile. Please try agian!')
            }
        } finally {
            setLoading(false)
        }
    }
    return { myProfile, error, loading }
}

export default useMyProfile