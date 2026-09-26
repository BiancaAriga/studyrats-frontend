# Etapa 1: build da aplicação Angular
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Etapa 2: servir a aplicação com Nginx
FROM nginx:alpine

COPY --from=build /app/dist/studyrats-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]