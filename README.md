
# Solidify

This application allows user to create events from Calendar built with Express-based server, Passport.js for authentication and PostgresSQL for database.

## Installation

-  ``npm install ``(installs dependencies listed in package.json)

- add .env file and configure with the following crenditals
```
DB_NAME =

DB_USERNAME =

DB_PASSWORD =

SECRET_KEY =

FACEBOOK_APP_ID =

FACEBOOK_SECRET =

GOOGLE_ID =

GOOGLE_SECRET = 
```

- ``knex migrate:latest`` (to add the table to the database)

- ``knex seed:run``

- run ``nodemon index.js`` on terminal

- go to https://localhost.3000

## How to run the application.

- Once on the link, users will be redirected to "/" homepage with get request.

- Register using email or sign in using facebook or google.

### Passport Strategies 

#### Local Strategy

- local-signup

- local-login

- bcrypt method to hash and compare password

- serialize and deserialize

#### Facebook Strategy

- facebook login

- serialize and deserialize

#### Google Strategy

- google login

- serialize and deserialize