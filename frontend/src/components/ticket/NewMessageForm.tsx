'use client';

import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { NewMessageFormProps } from '@/interfaces/ticket.interfaces';
import { useNewMessageForm } from '@/hooks/useNewMessageForm';

const NewMessageForm = ({ ticketId, token, onAdded }: NewMessageFormProps) => {

    const { form, error, loading, handleChange, handleAddMessage } = useNewMessageForm({ ticketId, token, onAdded });

    return (
        <form onSubmit={handleAddMessage}>
            {error && <Typography variant="body2" color="error" sx={{ m: 2 }}>{error}</Typography>}
            <TextField label="Write a message" multiline rows={4} variant="outlined" fullWidth value={form.content}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" color="primary"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
                </Button>
            </Box>
        </form>
    );
};

export default NewMessageForm;
