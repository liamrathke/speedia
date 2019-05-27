# Build Frontend
FROM node:12
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

# Add convenient way to access localhost inside Docker instance itself
RUN ip -4 route list match 0/0 | awk '{print $3 "host.docker.internal"}' >> /etc/hosts

# Build Nginx
FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

# Run Backend
CMD NODE_ENV=production node ./server/server.js
