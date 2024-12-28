import ProductDao from '../daos/productDao.js';

const getProducts = async (params) => {
    return await ProductDao.getProducts(params);
};

const getProductById = async (id) => {
    return await ProductDao.getProductById(id);
};

const createProduct = async (productData) => {
    return await ProductDao.createProduct(productData);
};

const updateProduct = async (id, productData) => {
    return await ProductDao.updateProduct(id, productData);
};

const deleteProduct = async (id) => {
    return await ProductDao.deleteProduct(id);
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
