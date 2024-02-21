FROM node:18-alpine
WORKDIR /react-vite-app
COPY . .
RUN npm install --silent
EXPOSE 5180
CMD ["npm","run","dev"]