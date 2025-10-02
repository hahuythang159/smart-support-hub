import { NewMessageFormProps } from "@/interfaces/ticket.interfaces"
import { createMessageTicketService } from "@/services/ticket.service"
import { Ticket, TicketCreateMessageRequest } from "@/types"
import { useState } from "react"

export const useNewMessageForm = ({ ticketId, token, onAdded }: NewMessageFormProps) => {
    const [form, setForm] = useState<TicketCreateMessageRequest>({ content: '' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({ ...form, content: e.target.value })
    };

    const handleAddMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if content is empty before submission
        if (!form.content.trim()) {
            setError('Message cannot be empty');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res: Ticket = await createMessageTicketService(ticketId, token, form);
            setForm({ content: '' });
            const newMessage = res.messages[res.messages.length - 1];
            onAdded?.(newMessage);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Failed to send message')
            }
        } finally {
            setLoading(false);
        }
    };

    return { form, error, loading, handleChange, handleAddMessage }
}