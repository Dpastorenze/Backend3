import { faker } from '@faker-js/faker';
import User from '../models/User.js'; // Ajusta el path según tu estructura de proyecto
import Product from '../models/productModel.js'; // Ajusta el path según tu estructura de proyecto


export const generateUsers = async (numUsers) => {
    try {
        let users = [];
        for (let i = 0; i < numUsers; i++) {
            let user = new User({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                age: faker.number.int({ min: 18, max: 65 }), // Añadir el campo age
                role: 'user'
            });
            users.push(user);
        }
        await User.insertMany(users);
        return users;
    } catch (error) {
        console.error('Error generating users:', error);
        throw error; // Propaga el error para que sea manejado en el router
    }
};

export const generateProducts = async (numProducts) => {
    try {
        let products = [];
        for (let i = 0; i < numProducts; i++) {
            let product = new Product({
                title: faker.commerce.productName(), // Añadir el campo title
                code: faker.string.uuid(), // Añadir el campo code
                stock: faker.number.int({ min: 1, max: 100 }), // Añadir el campo stock
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                thumbnails: [faker.image.url()], // Usar faker.image.url() en lugar de faker.image.imageUrl()
                category: faker.commerce.department() // Añadir el campo category
            });
            products.push(product);
        }
        await Product.insertMany(products);
        return products;
    } catch (error) {
        console.error('Error generating products:', error);
        throw error; // Propaga el error para que sea manejado en el router
    }
};
