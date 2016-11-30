FROM node:boron

MAINTAINER gr4per

#create app directory
RUN mkdir -p /app
WORKDIR /app

#Install app dependencies
#ADD ./package.json .
ADD . .

RUN if [ $HTTP_PROXY ]; then echo "proxy set: " $HTTP_PROXY; else echo "proxy not set"; fi
RUN if [ $HTTP_PROXY ]; then npm config set proxy "$HTTP_PROXY"; else npm config set proxy; fi
RUN if [ $HTTPS_PROXY ]; then echo "https proxy set: " $HTTPS_PROXY; else echo "https proxy not set"; fi
RUN if [ $HTTPS_PROXY ]; then npm config set https-proxy "$HTTPS_PROXY"; else npm config set https-proxy; fi
RUN npm install -g supervisor 
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

