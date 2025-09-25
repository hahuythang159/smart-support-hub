'use client';

import { Box, Typography, Paper, Divider } from '@mui/material';
import { Message } from "@/types";
import { formatDate } from '@/utils/formatDate';
import { useRef, useEffect } from 'react';

export default function MessageList({ messages }: { messages: Message[] }) {
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null)

    // Scroll to the latest message whenever the messages array changes
    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.map((m) => (
                <Paper key={m._id || m.createdAt} elevation={1} sx={{ padding: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                            {formatDate(m.createdAt)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {m.authorRole === 'user' ? 'User' : 'Staff'}
                        </Typography>
                    </Box>
                    <Typography variant="body1">{m.content}</Typography>
                    <Divider sx={{ marginTop: 2 }} />
                </Paper>
            ))}
            <div ref={endOfMessagesRef}></div>
        </Box>
    );
}
