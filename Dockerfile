# Este arquivo é usado para criar a imagem, e nessa imagem ele instala as dependências,
# então o dir. node_models fica apenas na imagem.

FROM node:16.14
RUN apt update
RUN apt install lsof
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY __tests__ __tests__
COPY .trybe .trybe
COPY src src
COPY .eslintignore .
COPY .eslintrc.json .
COPY .sequelizerc .
COPY jest.config.js .