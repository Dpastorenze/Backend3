import express from 'express';
import { Server } from 'socket.io';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import * as fs from "fs";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

let products = [];

if (fs.existsSync("./data/products.json")) {
  products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
};

const httpServer=app.listen(8080, () => {
  console.log(`Server ON`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  io.sockets.emit("realtime", { products });

  socket.on('newProduct', (data) => {
    io.emit('updateProducts', data);
  });

  socket.on('deleteProduct', (data) => {
    io.emit('updateProducts', data);
    });

});

export default io ; 
