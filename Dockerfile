#FROM tozd/meteor:ubuntu-xenial

FROM node:8

RUN useradd meteor -G staff -m -s /bin/bash

ADD --chown=meteor ./build/store.tar.gz /home/meteor

WORKDIR /home/meteor/bundle/programs/server
RUN npm install --unsafe-perm

WORKDIR /home/meteor

CMD ["node", "bundle/main.js"]
