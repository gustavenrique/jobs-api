FROM node:18

WORKDIR /app

COPY . .

RUN npm i

ENV PORT=5000

EXPOSE 5000

CMD [ "npm", "start" ]