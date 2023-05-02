FROM node:18-alpine
WORKDIR /mailchain-service
ADD src src
ADD nest-cli.json nest-cli.json
ADD package.json package.json
ADD README.md README.md
ADD tsconfig.build.json tsconfig.build.json
ADD tsconfig.json tsconfig.json
RUN yarn && npm install -g @nestjs/cli
CMD yarn run start
