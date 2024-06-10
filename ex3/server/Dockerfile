FROM --platform=linux/x86_64 public.ecr.aws/docker/library/node:hydrogen-alpine3.20

WORKDIR /server

COPY . .

RUN npm install && npm run build

EXPOSE 80

ENTRYPOINT ["npm", "run", "start"]