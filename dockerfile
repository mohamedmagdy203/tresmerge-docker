# FROM node:18
# WORKDIR /app
# COPY package*.json ./
# ARG NODE_ENV=production
# ENV NODE_ENV=$NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; then \
#       npm install --only=production; \
#     else \
#       npm install; \
#     fi
# COPY . .
# EXPOSE 4000
# CMD ["npm", "start"]
## multistage build



FROM node:20 as base
WORKDIR /app
COPY package.json .


FROM base as development

RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start-dev" ]


FROM base as production

RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]