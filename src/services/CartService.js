import mongoose from 'mongoose';
import CartDao from '../daos/CartDao.js';


const cartUnique= new mongoose.Types.ObjectId('6764d58c818f1f4c1ccf74c3');

class CartService {
    async get() {
        return await CartDao.get(cartUnique);
    }

    async getBy() {
        return await CartDao.getBy(cartUnique);
    }

    async create() {
        return await CartDao.create();
    }

    async addItemTo( product) {
        return await CartDao.addItemTo(cartUnique, product);
    }

    async deleteItemFrom(productId,quantity) {
        return await CartDao.deleteItemFrom(cartUnique, productId,quantity);
    }

    async delete() {
        return await CartDao.delete(cartUnique);
    }
}

export default new CartService();
