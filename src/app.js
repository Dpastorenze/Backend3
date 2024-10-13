import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import connectDB from './config/db.js';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouters from "./routes/viewsRouter.js"
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.engine("handlebars", handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use('/', viewsRouters);


io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('newProduct', async (product) => {

        const newProduct = new Product(product);
        await newProduct.save();
        
        io.emit('updateProducts', newProduct);
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});