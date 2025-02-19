FROM node:22.6-alpine3.19

ENV PORT=8000

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]