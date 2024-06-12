# First, use FROM to download a base image with the operating system to run the app
FROM node:alpine

# Now, switch the working directory
WORKDIR /usr/src/app

# Copy project files into the working directory
COPY . /usr/src/app

# Install Angular CLI and then the aplication dependencies
RUN npm install -g @angular/cli \
    && npm install

# Expose port 4200 to make it comply with the backend configurations
EXPOSE 4200

# Finally, run the app
CMD ["ng", "serve", "--host", "0.0.0.0"]