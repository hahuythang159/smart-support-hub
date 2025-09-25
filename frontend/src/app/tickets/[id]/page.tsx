'use client';

import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import MessageList from '@/components/ticket/MessageList';
import NewMessageForm from '@/components/ticket/NewMessageForm';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useTicketDetail } from '@/hooks/useTicketDetail';

const TicketDetailPage = () => {
    const { id } = useParams();
    const token = useSelector((state: RootState) => state.auth.token)

    const { ticket, loading, error, handleMessageAdded } = useTicketDetail(id as string, token as string)

    return (
        <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 2 }}>
            {error && <Typography variant="h6" color="error">{error}</Typography>}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                    <CircularProgress />
                </Box>
            ) : ticket ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h5" fontWeight="bold">{ticket.title}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                            Description: {ticket.description}
                        </Typography>
                        <Box sx={{ marginTop: 2, fontSize: '0.875rem', color: 'gray' }}>
                            <Typography variant="body2">Status: <span style={{ color: ticket.status === 'open' ? 'green' : 'red' }}>{ticket.status}</span></Typography>
                            <Typography variant="body2">Priority: {ticket.priority}</Typography>
                        </Box>
                    </Paper>

                    <Box>
                        <Typography variant="h6" fontWeight="bold">Messages</Typography>
                        <MessageList messages={ticket.messages} />
                    </Box>

                    {id && token && (
                        <NewMessageForm ticketId={id as string} token={token} onAdded={handleMessageAdded} />
                    )}
                </Box>
            ) : (
                <Typography variant="h6">Ticket not found</Typography>
            )}
        </Box>
    );
};

export default TicketDetailPage;
