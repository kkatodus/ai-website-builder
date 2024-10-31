FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN apk add --no-cache python3 make g++ && npm install --legacy-peer-deps

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npx", "next", "start"]