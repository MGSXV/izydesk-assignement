#!/bin/sh

docker compose up -d --build

cd ./ecommerce-client
npm install
npm run dev
cd ../back-office-client
npm install
npm run dev