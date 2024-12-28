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
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';
import sessionRoutes from './routes/sessionsRoutes.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js'
import session from 'express-session';
import registerHelpers from './utils/helpers.js';
import initializeSocket from './utils/socket.js';
import userMiddleware from './middlewares/userMiddleware.js';

dotenv.config();

const app = express();
const server = http.createServer(app);


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(passport.initialize());

app.use(session({
    secret: process.env.JWT_PRIVATE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(userMiddleware);

registerHelpers();
app.engine("handlebars", handlebars.engine({
    defaultLayout:'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,

    }
}));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use('/', viewsRouters);

app.use('/', sessionRoutes);

app.use('/api/users', userRouter);
app.use('/api/carts',cartsRouter);
app.use('/api/products', productsRouter);

const io = initializeSocket(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});