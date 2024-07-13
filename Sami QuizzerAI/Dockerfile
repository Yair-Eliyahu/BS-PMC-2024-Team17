FROM node:latest 

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install --silent

COPY . ./

EXPOSE 3000

CMD ["npm",  "start"]

