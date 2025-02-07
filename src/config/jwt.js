import dotenv from 'dotenv';

dotenv.config();

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
if (!jwtPrivateKey) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
console.log(`Clave privada JWT: ${jwtPrivateKey}`);

const port = process.env.PORT || 3000;

export { jwtPrivateKey, port };



