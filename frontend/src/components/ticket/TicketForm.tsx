'use client'

import { useTicketForm } from '@/hooks/useTicketForm';
import { TicketFormProps } from '@/interfaces/ticket.interfaces';

const TicketForm = ({ onTicketCreated }: TicketFormProps) => {
    const { form, error, loading, tagInput, handleAddTag, handleTagChange, handleChange, handleSubmit } = useTicketForm({ onTicketCreated })

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500">{error}</div>}

            <input required name="title" value={form.title} onChange={handleChange} placeholder="Title" />

            <textarea required name="description" value={form.description} onChange={handleChange} placeholder="Description" />

            <div className="flex gap-2 mt-2">
                <select name="priority" value={form.priority} onChange={handleChange} >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <div className="flex flex-col">
                    <input type="text" value={tagInput} onChange={handleTagChange} placeholder="Add a tag" />
                    <button type="button" onClick={handleAddTag} disabled={!tagInput.trim()} >
                        Add Tag
                    </button>
                    <div className="tags-list mt-1">
                        {form.tags.length > 0 && <p>Tags: {form.tags.join(', ')}</p>}
                    </div>
                </div>

                <button type="submit" disabled={loading} >
                    {loading ? 'Creating...' : 'Create Ticket'}
                </button>
            </div>
        </form>
    );
};

export default TicketForm;
