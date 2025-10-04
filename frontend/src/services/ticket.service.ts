import { Ticket, TicketCreateMessageRequest, TicketCreateRequest, Tickets, TicketUpdateRequest } from "@/types";
import { apiRequest } from "@/utils/api";

export const createTicketService = async (form: TicketCreateRequest, token: string): Promise<Ticket> => {
    const response = await apiRequest('/ticket', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
    })
    return response;
}

export const getTicketsService = async (token: string): Promise<Tickets> => {
    const response = await apiRequest('/ticket', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
};

export const getTicketByIdService = async (ticketId: string, token: string): Promise<Ticket> => {
    const response = await apiRequest(`/ticket/${ticketId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    })
    return response;
}

export const createMessageTicketService = async (ticketId: string, token: string, form: TicketCreateMessageRequest): Promise<Ticket> => {
    const response = await apiRequest(`/ticket/${ticketId}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
    })
    return response;
}

export const updateTicketService = async (ticketId: string, token: string, form: TicketUpdateRequest): Promise<Ticket> => {
    const response = await apiRequest(`/ticket/${ticketId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
    })
    return response;
}

export const deleteTicketService = async (ticketId: string, token: string): Promise<void> => {
    await apiRequest(`/ticket/${ticketId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        method: 'DELETE'
    })
}

export const getTicketsByUser = async (token: string, userId: string): Promise<Tickets> => {
    const response = await apiRequest(`/tickets/?requesterId=${userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer: ${token}` }
    })
    return response
}