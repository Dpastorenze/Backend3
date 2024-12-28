import mongoose from 'mongoose';
import Cart from '../models/cartModel.js'; 

class CartDao {
    async get() {
        return await Cart.find({});
    }

    async getBy(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('ID inválido');
            }
            const cart = await Cart.findById(id).populate('products.product');
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async create() {
        const newCart = new Cart();
        return await newCart.save();
    }

    async addItemTo(id, product) {
        try{
        const cart = await Cart.findById(id).populate('products.product');
        if (!cart) {
            throw new Error('carrito no encontrado')
        };
        cart.products.push(product);
        await cart.save();
        return await Cart.findById(id).populate('products.product');
    }catch(error){
        throw error;
        }
    }   
    async deleteItemFrom(id, productId,quantity) {
        try{
        console.log(`Intentando eliminar el producto con ID: ${productId} del carrito con ID: ${id}`);
        if (!mongoose.Types.ObjectId.isValid(id)) { throw new Error('ID inválido'); }
        
        if (!mongoose.Types.ObjectId.isValid(productId)) { throw new Error('ID de producto inválido');
        }
        const cart = await Cart.findById(id).populate('products.product');
        console.log('carrito recu',cart);
        if (!cart) {
            throw new Error('carrito no encontrado')
        };
        
        cart.products = cart.products.map(item =>{
            if (item.product && item.product._id.toString() === productId) {
                if (item.quantity > quantity) {
                    item.quantity -= quantity; 
                } else {
                
                    console.log(`Eliminando producto con ID: ${item.product._id.toString()}`);
                return null; 
            }
        }return item;
            }).filter(item=>item!=null);
        await cart.save();
        const updatedCart = await Cart.findById(id).populate('products.product'); 
        console.log('Carrito actualizado:', updatedCart);
        return updatedCart
    }catch(error){
        throw error;
        }
    }

    async delete(id) {
        return await Cart.findByIdAndDelete(id);
    }
}

export default new CartDao();





