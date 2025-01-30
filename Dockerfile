# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3009

# Command to run the app
CMD ["node", "index.js"]
