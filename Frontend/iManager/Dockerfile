# Etapa de construção
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Executa o build
RUN npm run build

# Etapa final
FROM nginx:alpine

# Copia os arquivos construídos para o diretório do nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponha a porta do nginx
EXPOSE 80