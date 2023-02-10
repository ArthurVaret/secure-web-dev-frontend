FROM node:18-alpine

WORKDIR /usr/web-app-locations

COPY . .

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

CMD ["node", "-r", "dotenv/config", "build"]