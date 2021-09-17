# FROM node:11-alpine as build-step
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install 
# COPY . /app
# RUN npm build --prod
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/dist/mirage-ng-11.0.0 /usr/share/nginx/html

FROM node:10.13.0 as build
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
#RUN npm install -g @angular/cli
# Install all the dependencies
RUN npm install
# Generate the build of the application
RUN npm run build --prod
# COMANDO PARA APLICAR NUEVOS CAMBOS EN LA APP (UPDATE)
# >>>>>>>>>> ng build --prod <<<<<<<<<<<<
# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:1.14.2
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/mirage /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80
EXPOSE 4200:80