# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN useradd -m yukthamukhi


USER yukthamukhi


# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]
