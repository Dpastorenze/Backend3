import productService from '../services/productService.js';
import productDTO from '../dtos/productDto.js';


const getProducts = async (req, res) => {
    try{
        const cartId=req.session.cartId;
        const products=await productService.getProducts();
        const user=req.session.user;

        if(!cartId){
            return res.status(400).send('cartID was not found')
        }

        res.render('products',{products,cartId,user});
    }catch(error){
        res.status(500).json({message:error.message});
    }
    }

const getProductById = async (req, res) => {
    const product = await productService.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: new productDTO(product) });
};

const createProduct = async (req, res) => {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json({ status: 'success', payload: new productDTO(newProduct) });
};

const updateProduct = async (req, res) => {
    const updatedProduct = await productService.updateProduct(req.params.pid, req.body);
    if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: new productDTO(updatedProduct) });
};

const deleteProduct = async (req, res) => {
    const deletedProduct = await productService.deleteProduct(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', message: 'Producto eliminado' });
};

const renderRealTimeProducts = (req, res) => {
    res.render('realtimeproducts');
};
export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    renderRealTimeProducts
};

