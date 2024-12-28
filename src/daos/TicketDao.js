import Ticket from '../models/Ticket.js';

class TicketDao {
    async create(ticketData) {
        return await Ticket.create(ticketData);
    }
    
    async findById(id) {
        return await Ticket.findById(id);
    }
    
    async findAll() {
        return await Ticket.find();
    }
}

export default TicketDao;
