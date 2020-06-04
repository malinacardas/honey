from node:lts

COPY . app
WORKDIR app

RUN npm install -g ember-cli
RUN npm install
RUN npm install --only=dev

CMD ember serve