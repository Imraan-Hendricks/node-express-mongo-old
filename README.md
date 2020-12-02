# node-express-mongo

Server side structure using express, mongoDB and node js. Built for web and mobile applications.

### Features include:

- authentication
- contact us route
- client controller
- dev and production npm scripts
- dotenv and env variable management
- nodemailer
- route management
- session management
- shutdown on interrupt and terminate
- validation

### Requirements:

- node js v12 (current version: 12.18.0)

### Usage:

- clone repository or download source code
- create .env file in config dir and add environment variables (see: /config/.env.example)
- open project directory in terminal
- npm install
- npm run dev

### Production:

To start the server in production mode run `npm run start`. Note that the environment variables are setup for the development environment and will not be available in production mode. In production, environment variables should be configured on the host server.

### Available scripts:

In the project directory, you can run:

### `npm run start`

Starts the server in production mode

### `npm run dev`

Starts the server in development mode
