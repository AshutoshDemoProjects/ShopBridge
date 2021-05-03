# Install Node Image
# FROM node:12.2.0-alpine
FROM node:14-alpine
# Working directory inside the container
WORKDIR /app

# Copy over the package.json files
COPY ./package*.json /app/

# Install dependencies
RUN npm install

# Copy everything
COPY . .

# 
EXPOSE 5000

# Run server.js file when container start
CMD ["node", "server.js"]