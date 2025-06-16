FROM node:18-alpine AS build

WORKDIR /src

# install dependencies
COPY package*.json ./
RUN npm ci

# copy source
COPY . .

#building 


ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build


#production
FROM nginx:1.25-alpine

# copy built assets (from previous stage)
COPY --from=build /src/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]