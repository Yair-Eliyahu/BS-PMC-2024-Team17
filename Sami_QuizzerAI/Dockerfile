# Use an official Node.js runtime as a parent image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json
COPY package.json /.

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . /app

# Expose the necessary port
EXPOSE 3000

# Run the application
CMD ["npm" ,"start"]

