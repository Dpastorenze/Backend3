// models/Ticket.js
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
});

ticketSchema.pre('save', function(next) {
    this.code = `TICKET-${Math.floor(Math.random() * 1000000)}`; // Generar código único
    next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;