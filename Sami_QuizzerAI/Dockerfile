# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json /.
COPY package-lock.json /.


# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

#run the dev server of the app 
RUN npm run dev

# Expose the necessary port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]

