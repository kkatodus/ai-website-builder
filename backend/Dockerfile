# backend/Dockerfile

# Use Node.js as a base image
FROM node:22.1.0-bullseye
# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

RUN npm install

# Copy the entire project
COPY . .

RUN npm run build

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]
