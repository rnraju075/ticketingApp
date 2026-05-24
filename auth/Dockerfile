FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --fetch-timeout=600000

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]