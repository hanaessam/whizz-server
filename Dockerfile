# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /user/src/app


# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8888

# Command to run the application
CMD ["npm", "start"]
