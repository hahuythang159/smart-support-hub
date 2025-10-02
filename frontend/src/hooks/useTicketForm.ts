import { TicketFormProps } from "@/interfaces/ticket.interfaces"
import { createTicketService } from "@/services/ticket.service"
import { TicketCreateRequest } from "@/types"
import { getToken } from "@/utils/tokenUtils"
import { useState } from "react"

export const useTicketForm = ({ onTicketCreated }: TicketFormProps) => {
    const [form, setForm] = useState<TicketCreateRequest>({ title: '', description: '', priority: 'medium', tags: [] })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [tagInput, setTagInput] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value)
    }

    const handleAddTag = () => {
        if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
            setForm({ ...form, tags: [...form.tags, tagInput.trim()] })
            setTagInput('')
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        const token = getToken()

        if (!token) {
            setError('Authorization token is missing!')
            setLoading(false)
            return;
        }

        try {
            const data = await createTicketService(form, token)
            setForm({ title: '', description: '', priority: 'medium', tags: [] })
            onTicketCreated(data)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unknown error occurred. Please try again!')
            }
        } finally {
            setLoading(false)
        }
    }

    return { form, error, loading, tagInput, handleChange, handleTagChange, handleAddTag, handleSubmit }
}