class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(p => ({
            product: p.product._id,
            quantity: p.quantity
        }));
    }
}

export default CartDTO;
