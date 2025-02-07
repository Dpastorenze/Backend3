import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { mode } = argsUtil;

const path = ".env." + mode;
config({ path });

const env = {
    
        PORT: process.env.PORT || 8080,
        MONGODB: process.env.MONGODB,
        
   
};

export default env;