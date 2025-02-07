import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("Base de datos mongo",process.env.MONGO_LINK, {

        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;