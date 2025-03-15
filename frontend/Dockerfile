# Step 1: Build the React app
FROM node:21-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the app using a lightweight web server
FROM nginx:alpine

# Copy the build output to Nginx's static file directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
