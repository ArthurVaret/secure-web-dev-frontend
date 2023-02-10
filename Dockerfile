FROM node:18-alpine

WORKDIR /usr/web-app-locations

COPY . .

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

EXPOSE 4173

CMD ["npm", "run", "preview"]