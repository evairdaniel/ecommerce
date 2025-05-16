FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY .env .env
RUN npm install --only=production --force

EXPOSE 3000
CMD ["node", "dist/main"]
