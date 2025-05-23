FROM node:24-alpine3.21 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:24-alpine3.21 AS prod
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env .env
COPY --from=builder /app/generated ./generated

CMD yarn prisma migrate deploy && yarn start
