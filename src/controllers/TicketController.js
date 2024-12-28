import TicketService from '../services/TicketService.js';

const ticketService = new TicketService();

class TicketController {
    async createTicket(req, res) {
        try {
            const ticketData = req.body;
            const ticket = await ticketService.createTicket(ticketData);
            res.status(201).json({ status: 'success', data: ticket });
        } catch (error) {
            console.error('Error creating ticket:', error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    }

    async getTicketById(req, res) {
        try {
            const { id } = req.params;
            const ticket = await ticketService.getTicketById(id);
            res.status(200).json({ status: 'success', data: ticket });
        } catch (error) {
            console.error('Error fetching ticket:', error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    }

    async getAllTickets(req, res) {
        try {
            const tickets = await ticketService.getAllTickets();
            res.status(200).json({ status: 'success', data: tickets });
        } catch (error) {
            console.error('Error fetching tickets:', error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    }
}

export default new TicketController();
