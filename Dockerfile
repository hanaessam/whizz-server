# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /user/src/app

ENV PDF_SAVE_PATH=/user/src/app/pdfs
ENV DOCX_SAVE_PATH=/user/src/app/docxs
ENV MD_SAVE_PATH=/user/src/app/mds


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
