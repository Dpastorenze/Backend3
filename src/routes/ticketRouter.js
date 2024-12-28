import express from 'express';
import TicketController from '../controllers/TicketController.js';

const router = express.Router();

router.post('/', TicketController.createTicket);
router.get('/:id', TicketController.getTicketById);
router.get('/', TicketController.getAllTickets);

export default router;
