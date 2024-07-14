# Use an official Node.js runtime as a parent image
FROM node:latest

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
