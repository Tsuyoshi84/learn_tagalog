# Use the official Node.js image as a base
FROM node:23

# Install pnpm
RUN npm install -g pnpm@9.14.2

# Set the working directory
WORKDIR /workspace

# Copy the current directory contents into the container
COPY . /workspace