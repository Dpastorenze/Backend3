import TicketDao from '../daos/TicketDao.js';

class TicketRepository {
    constructor() {
        this.ticketDao = new TicketDao();
    }

    async createTicket(ticketData) {
        return await this.ticketDao.create(ticketData);
    }

    async getTicketById(id) {
        return await this.ticketDao.findById(id);
    }

    async getAllTickets() {
        return await this.ticketDao.findAll();
    }


}

export default TicketRepository;
