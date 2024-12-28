import mongoose from 'mongoose';
import CartService from "../services/CartService.js";
import sendMail from '../services/mailingService.js';
import Ticket from '../models/Ticket.js';

const generateUniqueCode = () => {
    return 'TICKET-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

class CartController {
    
  static  renderCartView = async (req, res) => {
        try {
            // const { productId,quantity,price } = req.body;
            // const product = { product: productId, quantity };
          const cart = await CartService.getBy()
        
          if (!cart || !cart.products) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const total = cart.products.reduce((acc, item) => {
            return acc + (item.product?.price || 0) * item.quantity;
        }, 0);          
          res.render("cart", { cart,total });
        } catch (error) {
          res.status(500).json({ status: "error", message: error.message });
        }
      };



      static  getCarts = async (req, res) => {
        try {
            const cart = await CartService.getBy();
            console.log(cart);
            res.status(200).json({
                status: 'success',
                payload: cart
            });
        } catch (error) {
            console.log(error);
        }
    }

    static getCart = async (req, res) => {
        const { cid } = req.params;
        console.log(cid)
        try {
            
            const cart = await CartService.getBy({ _id: cid });
            if (!cart) {
                return res.status(401).render({
                    status: 'error',
                    message: 'Cart not found'
                });
            }
            res.status(200).json({
                cart
            });
        } catch (error) {
            console.log(error);
        }
    }

    static  createCart = async (req, res) => {
        try {
            const resp = await CartService.create();
            if (!resp) {
                return res.status(404).json(resp);
            }
            res.status(200).json(resp);
        } catch (error) {
            console.log(error);
        }
    }

    static  addProductToCart = async (req, res) => {
        try {
            const { productId,quantity } = req.body;
            const product = { product: productId, quantity };
            const cart = await CartService.addItemTo( product);
            if (!cart) return res.status(404).json({ status: 'error', message: 'Cart not found' });
            res.status(200).json({
                status: 'success',
                message: 'Product added to cart'
            });
        } catch (error) {
            console.log(error);
        }
    }

    static  deleteProductFromCart = async (req, res) => {
        try {
            const { productId,quantity } = req.body;
            console.log('el produ es',productId);
            const cart= await CartService.deleteItemFrom(productId,quantity);
            if (!cart){
                throw new Error('carrito no encontrado')
            } 

            res.status(200).json({
                status: 'success',
                message: 'Product deleted from cart',cart
            });
        } catch (error) {
            console.log(error);
        }
    }

    static deleteCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const resp = await CartService.delete(cid);
            if (!resp) return res.status(404).json({ status: 'error', message: 'Cart not found' });
            res.status(200).json(resp);
        } catch (error) {
            console.log(error);
        }
    }

static checkoutCart = async (req, res) => {
    try {
        const cart = await CartService.getBy();
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const userEmail = req.user.email;
        const newTicket = new Ticket({
            code:generateUniqueCode(),
            userEmail,
            products: cart.products,
            total
        });
        await newTicket.save();
        
        res.render('ticket', { cart, total });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

static sendEmail = async (req, res) => {
    try {
        const { cart, total } = req.body;
        const ticket = cart.products.map(item => {
            return `Producto: ${item.product.name} - Precio: $${item.product.price} - Cantidad: ${item.quantity}`;
        }).join('\n');

        
        const userEmail = req.user.email; 
        const subject = 'Detalle de su compra';
        const text = `Gracias por su compra. Aquí está su ticket:\n\n${ticket}\n\nTotal: $${total}`;
        const html = `<h1>Gracias por su compra</h1><p>Aquí está su ticket:</p><pre>${ticket}</pre><p>Total: $${total}</p>`;

        await sendMail(userEmail, subject, text, html);

        res.status(200).json({ status: 'success', message: 'Correo enviado con éxito' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}
}

export default CartController;



