// import { Command } from 'commander';
// import dotenv from 'dotenv';
// import path from 'path';

// const program = new Command();

// program
//     .option('-m, --mode <mode>', 'Modo de ejecución', 'development') // Argumento para el modo
//     .parse(process.argv);

// const options = program.opts();
// const envFile = options.mode === 'production' ? '.env.production' : '.env.development';
// console.log("📂 Archivo de entorno seleccionado:", envFile);

// dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// export default {
//     PORT: process.env.PORT || 8080,
//     MONGODB: process.env.MONGODB,
//     JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
// };
import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';
import logger from '../utils/logger.js';

export function loadEnvFile(environment) {
  const envPath = path.resolve(process.cwd(), `.env.${environment}`);
  logger.info(`Intentando cargar el archivo de entorno: ${envPath}`);
  if (fs.existsSync(envPath)) {
    config({ path: envPath });
    logger.info(`Archivo de entorno ${envPath} cargado correctamente.`);
  } else {
    logger.error(`No se encontró el archivo ${envPath}`);
    process.exit(1);
  }
}
