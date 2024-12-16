
import productModel from '../models/product.model';

class ProductDaosMongo {
    constructor() {
        this.model = productModel;
    }

    // async get({limit=10, page=1, category='', sort=1}){       
    //     return await this.model.paginate(category.length !== 0 ? { category: category } : {}, { limit, page, lean: true, sort: { price: sort } });                               
    // }

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
