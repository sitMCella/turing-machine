FROM node:19.9.0-alpine AS build
WORKDIR /usr/src/turing-machine
COPY package.json package-lock.json nginx.conf ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/turing-machine/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/turing-machine/dist/turing-machine /usr/share/nginx/html
EXPOSE 80
