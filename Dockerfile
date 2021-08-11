FROM node as base

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

ENV PORT=3000
ENV MONGODB_URL=mongodb://root:123test@mongo:27017
ENV SECRET=<YOUR_SECRET_FOR_BCRYPTJS_HERE>
ENV SALT_ROUNDS=13
ENV MAIL_HOST=<YOUR_MAIL_HOST>
ENV MAIL_USER=<YOUR_MAIL_USER>
ENV MAIL_PASS=<YOUR_MAIL_PASSWORD>

FROM base as test

RUN yarn test

FROM base as build

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]