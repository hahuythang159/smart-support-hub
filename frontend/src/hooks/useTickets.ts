import { getTicketsService } from "@/services/ticket.service"
import { RootState } from "@/store/store"
import { Ticket, Tickets } from "@/types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useTickets = () => {
    const [tickets, setTickets] = useState<Tickets>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { role, token } = useSelector((state: RootState) => state.auth)

    const userRole = role === 'admin' || role === 'staff' || role === 'user' ? role : 'user'

    useEffect(() => {
        if (token) {
            loadTickets(token)
        }
    }, [token])

    const loadTickets = async (token: string) => {
        setError(null)
        setLoading(true)
        try {
            const data = await getTicketsService(token)
            setTickets(data)
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again!')
        } finally {
            setLoading(false)
        }
    }

    const handleTicketCreated = (newTicket: Ticket) => {
        setTickets((prewTickets) => [...prewTickets, newTicket])
    }

    return { tickets, userRole, error, loading, handleTicketCreated }
}