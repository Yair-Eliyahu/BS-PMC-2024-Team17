# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json
COPY package.json ./
COPY package-lock.json ./


# Install dependencies
RUN npm install -g npm@latest

# Copy the rest of the application code
COPY . .

# Expose the necessary port
EXPOSE 3000

# Run the application
CMD ["npm" , "start"]

