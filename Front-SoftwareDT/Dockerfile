FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exponer el puerto por defecto de Vite
EXPOSE 5173

# El flag --host es vital para que Docker acepte conexiones externas
CMD ["npm", "run", "dev", "--", "--host"]