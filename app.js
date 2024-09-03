import express from 'express';
import productsRouter from './src/routes/products.js';
import cartsRouter from './src/routes/carts.js';

const app = express();
const port=8080;

app.use(express.json ());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
    res.send('Servidor Express.js corriendo en el puerto 8080');
});

app.listen(8080, () => {
    console.log('servidor corriendo en el puerto 8080');
});


