import Product from '../models/productModel.js';

const getProducts = async ({ limit, page, sort, query }) => {
    const filter = query ? { category: query } : {};
    const products = await Product.find(filter)
        .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : {})
        .limit(Number(limit))
        .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return { products, totalPages, pageDetails: getPageDetails(page, totalPages) };
};

const getPageDetails = (page, totalPages) => ({
    page: Number(page),
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    prevLink: page > 1 ? `/api/products/?page=${page - 1}` : null,
    nextLink: page < totalPages ? `/api/products/?page=${page + 1}` : null,
});

const getProductById = async (id) => {
    return await Product.findById(id);
};

const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};

const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
