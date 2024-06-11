# First, use FROM to download a base image with the operating system to run the app
FROM mysql:8.0.18

# Set root password to access the MySQL interpreter
ENV MYSQL_ROOT_PASSWORD=root

# Copy the SQL queries into the folder to be executed when initializing the database
COPY ./database_conf.sql /docker-entrypoint-initdb.d/

# Expose the target port
EXPOSE 3306