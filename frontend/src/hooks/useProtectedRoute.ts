'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '@/store/store'

export function useProtectedRoute(allowedRoles: string[] = ['admin', 'staff']) {
    const router = useRouter()
    const { role, isAuthenticated } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            alert('You are not logged in. Please log in to continue.')
            setTimeout(() => {
                router.replace('/auth/login')
            }, 800)
        } else if (role && !allowedRoles.includes(role)) {
            setTimeout(() => {
                router.replace('/unauthorized')
            }, 800)
        }
    }, [role, isAuthenticated, router, allowedRoles])

    const hasAccess = isAuthenticated && allowedRoles.includes(role || '')

    return { role, hasAccess }
}
