import { socketAuthorization } from '../middlewares/authorization.js';
import { Server } from 'socket.io';
import Product from '../models/productModel.js';

const initializeSocket = (server) => {
    const io = new Server(server);

    //no funciona falta retoques 
    // io.use(socketAuthorization(['admin']));

    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado');
    
        socket.on('newProduct',(product) => {
            try{
                if(!product.thumbnails){
                product.thumbnails=[];
            }else if(typeof product.thumbnails==='string'){
                product.thumbnails = product.thumbnails.split(',');
            }
            const newProduct = new Product(product);
            newProduct.save();
            
            io.emit('updateProducts', product);

        }catch(error){
            console.error('error al guardar el producto:',error);
        }
        });
    });

    return io;
};

export default initializeSocket;
