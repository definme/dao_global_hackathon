FROM node:18
WORKDIR /mailchain-service
ADD src src
ADD nest-cli.json nest-cli.json
ADD package.json package.json
ADD README.md README.md
ADD tsconfig.build.json tsconfig.build.json
ADD tsconfig.json tsconfig.json
CMD yarn run start
