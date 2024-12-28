import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    code: { type: String, required: true, unique: true }, // Campo `code` único
    userEmail: { type: String, required: true },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
