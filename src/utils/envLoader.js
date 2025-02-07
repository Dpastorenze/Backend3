import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';
import argsUtil from './args.util.js';
import logger from './logger.js';

const { mode } = argsUtil;

const envPath = path.resolve(process.cwd(), `.env.${mode}`);
logger.info(`Intentando cargar el archivo de entorno: ${envPath}`);
if (fs.existsSync(envPath)) {
  config({ path: envPath });
  logger.info(`Archivo de entorno ${envPath} cargado correctamente.`);
} else {
  logger.error(`No se encontró el archivo ${envPath}`);
  process.exit(1);
}

const env = {
  PORT: process.env.PORT,
  MONGO_LINK: process.env.MONGO_LINK,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
};

// logger.info(`Variables de entorno cargadas: ${JSON.stringify(env)}`);

export default env;

