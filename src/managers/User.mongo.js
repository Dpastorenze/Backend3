import User from "../models/User.js";

class UserDaoMongo {
    constructor() {
        this.User = User;
    }

    getProducts = async () => await this.User.find();
    
    getProduct = async (filter) => await this.User.findOne(filter);
    
    createProduct = async (newUser) => await this.User.create(newUser);
    
    updateProduct = async (pid, productToUpdate) => await this.User.findByIdAndUpdate(pid, productToUpdate);
    
    deleteProduct = async (pid) => await this.User.deleteOne({ _id: pid });
}

export default UserDaoMongo;