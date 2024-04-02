FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3001
COPY . .
CMD ["npm", "start"]