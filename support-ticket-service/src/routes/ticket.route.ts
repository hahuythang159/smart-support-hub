import { Router } from 'express';
import { addMessage, createTicket, deleteTicket, getTicketById, getTickets, updateTicket } from '../controllers/ticket.controller';
const router = Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.post('/:id/messages', addMessage); // add reply/message
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);


export default router;