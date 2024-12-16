import UserDao from "../daos/factory";
import ProductDao from "../daos/factory";
import ProductRepository from "../repositories/products.repository";
import UserRepository from "../repositories/users.repository";

const userService = new UserRepository(new UserDao());
const productService = new ProductRepository(new ProductDao());

export {
    userService,
    productService
};
