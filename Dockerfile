FROM node:24-alpine3.21 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma generate
RUN yarn build


FROM node:24-alpine3.21 AS prod
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated

CMD ["sh", "-c", "yarn prisma migrate deploy && yarn start:prod"]
