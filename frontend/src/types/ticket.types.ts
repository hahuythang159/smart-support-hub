export type Message = {
    _id?: string;
    authorId: string;
    authorRole: 'user' | 'staff' | 'admin';
    content: string;
    createdAt: string;
}

export type Tickets = Ticket[]

export type Ticket = {
    _id: string;
    title: string;
    description: string;
    requesterId: string;
    assigneeId?: string | null;
    status: 'open' | 'pending' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

export type TicketCardProps = {
    ticket: Ticket;
    role: 'user' | 'staff' | 'admin';
}

export type TicketCreateRequest = {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
}

export type TicketGetResponse = Ticket;

export type TicketCreateMessageRequest = {
    content: string;
}

export type UseTicketDetailProps = {
    id: string;
    token: string | null;
}

export type OnMessageAdded = (message: Message) => void;

export type TicketUpdateRequest = {
    status: 'open' | 'closed' | 'resolved' | 'pending';
    priority: 'low' | 'medium' | 'high';
}

