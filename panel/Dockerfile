# Usamos una imagen base de Node.js
FROM node:18-alpine AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de la aplicación al contenedor
COPY ./ ./

# Instalamos las dependencias
RUN npm install

# Construimos la aplicación
RUN npm run build

# Usamos una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copiamos los archivos construidos en la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto en el que Nginx escuchará
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
