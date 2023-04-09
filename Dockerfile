# Stage 1 - the build process with node
FROM node:16 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2 - the production environment with nginx
FROM nginx:stable
COPY --from=node /app/dist/emprestimo-home /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
