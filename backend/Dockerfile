# backend/Dockerfile

# Use Node.js as a base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]
