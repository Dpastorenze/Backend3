import ProductService from '../services/productService.js';

class ProductRepository {
    constructor() {
        this.productService = ProductService; 
    }

    async getProducts(params) {
        return await this.productService.getProducts(params);
    }

    async getProductById(id) {
        return await this.productService.getProductById(id);
    }

    async createProduct(productData) {
        return await this.productService.createProduct(productData);
    }

    async updateProduct(id, productData) {
        return await this.productService.updateProduct(id, productData);
    }

    async deleteProduct(id) {
        return await this.productService.deleteProduct(id);
    }
}

export default new ProductRepository();
