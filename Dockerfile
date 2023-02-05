FROM node:18-slim As development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn --only=development

COPY . .

RUN yarn prisma generate
RUN yarn build

FROM node:18-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn --only=production

COPY . .

RUN yarn build

ARG JWT_SECRET
ENV JWT_SECRET ${JWT_SECRET}

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

ARG PORT
ENV PORT $PORT

#COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]