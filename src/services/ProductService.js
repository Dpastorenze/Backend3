import productDao from '../daos/productDao.js';

const getProducts = async (params) => {
    return await productDao.getProducts(params);
};

const getProductById = async (id) => {
    return await productDao.getProductById(id);
};

const createProduct = async (productData) => {
    return await productDao.createProduct(productData);
};

const updateProduct = async (id, productData) => {
    return await productDao.updateProduct(id, productData);
};

const deleteProduct = async (id) => {
    return await productDao.deleteProduct(id);
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
