# Usar una imagen base oficial de Node.js
FROM node:20

# Crear y establecer el directorio de trabajo del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación al directorio de trabajo
COPY . .

# Reinstalar bcrypt dentro del contenedor
RUN npm rebuild bcrypt --build-from-source

# Definir el puerto en el que la aplicación escuchará
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
