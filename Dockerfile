FROM jenkins/jenkins:lts 
USER root 
RUN apt-get update 
RUN curl -sSL https://get.docker.com/ | sh# Use an official Node.js runtime as a parent image
FROM node:20


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm globally and install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the necessary port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
