
import productModel from '../models/product.model';

class ProductDaosMongo {
    constructor() {
        this.model = productModel;
    }
    get = async () => {
        return await this.model.find();
    }

    getBy = async (filter) => {
        return await this.model.findOne(filter);
    }

    create = async (newProduct) => {
        return await this.model.create(newProduct); 
    }

    update = async (pid, updateProduct) => {
        return await this.model.findByIdAndUpdate({ _id: pid }, updateProduct, { new: true });
    }

    delete = async (pid) => {
        return await this.model.findByIdAndUpdate({ _id: pid }, { isActive: false }, { new: true });
    }
}

export default ProductDaosMongo;
