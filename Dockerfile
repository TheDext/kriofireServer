FROM node:20.10.0-alpine
WORKDIR /app
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV production
CMD ["npm", "run", "dev"]
EXPOSE 3000
