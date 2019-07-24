FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Copy the project and install dependencies
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3000
CMD [ "./init.sh" ]