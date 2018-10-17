FROM node:8

WORKDIR /opt
COPY . .
RUN npm i
RUN sed 's/\/\/return/return/g' -i src/App/後端.jsx
CMD npm start

