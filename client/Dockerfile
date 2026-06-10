FROM node:alpine AS base

WORKDIR /app

COPY package.json .

RUN npm i --global pnpm@latest serve

RUN pnpm i

RUN pnpm approve-builds --all

EXPOSE 1234

FROM base AS dev

CMD [ "pnpm", "start" ]

FROM base AS builder

EXPOSE 3000

COPY . .

RUN pnpm build

CMD ["serve", "dist"]

FROM nginx:alpine AS prod

EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html
