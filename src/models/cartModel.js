import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;

