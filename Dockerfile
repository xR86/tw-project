FROM nodesource/node:4.4

ADD package.json package.json  
RUN npm install  
ADD . .

EXPOSE  8081
CMD ["npm","start"]  #CMD ["node","app.js"]  