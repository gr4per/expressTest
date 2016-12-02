FROM node:boron

MAINTAINER gr4per

#create app directory
RUN mkdir -p /app
WORKDIR /app

#Install app dependencies
#ADD ./package.json .
ADD . .

RUN if [ -z $HTTP_PROXY ]; then echo "proxy not set"; else echo "proxy set: $HTTP_PROXY"; fi
RUN if [ -z $HTTP_PROXY ]; then npm config delete proxy; else npm config set proxy "$HTTP_PROXY"; fi
RUN if [ -z $HTTPS_PROXY ]; then echo "https proxy not set"; else echo "https proxy set: $HTTPS_PROXY"; fi
RUN if [ -z $HTTPS_PROXY ]; then npm config delete https-proxy; else npm config set https-proxy  "$HTTPS_PROXY"; fi
RUN npm install -g supervisor 
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

