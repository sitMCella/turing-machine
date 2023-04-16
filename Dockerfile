FROM node:12.7-alpine AS build
WORKDIR /usr/src/turing-machine
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/turing-machine/dist/turing-machine /usr/share/nginx/html
