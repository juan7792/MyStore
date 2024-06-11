# Download the JDK base image
FROM openjdk:17

# Create a folder to persist data inside the container
VOLUME /tmp

# Expose port
EXPOSE 8080

# Create a variable to be passed at runtime
ARG JAR_FILE=target/backend-1.0-SNAPSHOT.jar

# Add the original .jar file from the host to the image .jar file
ADD ${JAR_FILE} app.jar

# Execute the app
ENTRYPOINT ["java","-jar","app.jar"]