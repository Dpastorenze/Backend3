import TicketRepository from '../repositories/TicketRepository.js';
import TicketDto from '../dtos/TicketDto.js';

class TicketService {
    constructor() {
        this.ticketRepository = new TicketRepository();
    }

    async createTicket(ticketData) {
        const ticket = await this.ticketRepository.createTicket(ticketData);
        return new TicketDto(ticket);
    }

    async getTicketById(id) {
        const ticket = await this.ticketRepository.getTicketById(id);
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        return new TicketDto(ticket);
    }

    async getAllTickets() {
        const tickets = await this.ticketRepository.getAllTickets();
        return tickets.map(ticket => new TicketDto(ticket));
    }
}

export default TicketService;
