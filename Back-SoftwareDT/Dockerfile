# 1. Usar una imagen de Node ligera y segura
FROM node:20-alpine

# 2. Crear y definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar solo los archivos de dependencias
COPY package*.json ./

# 4. Instalar solo las dependencias de producción (más rápido y ligero)
RUN npm ci --only=production

# 5. Copiar el resto del código del backend al contenedor
COPY . .

# 6. Exponer el puerto donde corre tu API ( cámbialo si usas el 3000 o 5000 )
EXPOSE 8080

# 7. Comando para arrancar el servidor
CMD ["node", "index.js"]