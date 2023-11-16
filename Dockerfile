
### 🧑‍💻 Development

FROM node:18-alpine as dev

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV dev

COPY --chown=node:node . .

RUN yarn --frozen-lockfile

USER node


### 🏡 Prod Build

FROM node:18-alpine as build

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --chown=node:node --from=dev /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

RUN yarn --frozen-lockfile --production && yarn cache clean

USER node

## 🚀 Production

FROM node:18-alpine as prod

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --chown=node:node --from=build /app/dist dist

COPY --chown=node:node --from=build /app/node_modules node_modules

USER node

CMD ["node", "dist/main.js"]