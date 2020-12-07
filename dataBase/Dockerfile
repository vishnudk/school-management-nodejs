FROM node:current-slim
WORKDIR /usr/src/app 
COPY . .
RUN npm install
EXPOSE 8080
RUN npm install mongodb
RUN npm install mongoose
CMD ["node","app.js"]


