import ProductService from '../services/productService.js';
import ProductDTO from '../dtos/productDTO.js';


const getProducts = async (req, res) => {
    try{
        const cartId=req.session.cartId;
        const products=await ProductService.getProducts();
        const user=req.session.user;

        if(!cartId){
            return res.status(400).send('no se encontro el cartID')
        }

        res.render('products',{products,cartId});
    }catch(error){
        res.status(500).json({message:error.message});
    }
    }

const getProductById = async (req, res) => {
    const product = await ProductService.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: new ProductDTO(product) });
};

const createProduct = async (req, res) => {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json({ status: 'success', payload: new ProductDTO(newProduct) });
};

const updateProduct = async (req, res) => {
    const updatedProduct = await ProductService.updateProduct(req.params.pid, req.body);
    if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: new ProductDTO(updatedProduct) });
};

const deleteProduct = async (req, res) => {
    const deletedProduct = await ProductService.deleteProduct(req.params.pid);
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

