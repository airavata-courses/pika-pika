FROM node:10

ARG AWSAccessKeyId
ENV AWSAccessKeyId=${AWSAccessKeyId}

ARG AWSSecretKey
ENV AWSSecretKey=${AWSSecretKey}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]