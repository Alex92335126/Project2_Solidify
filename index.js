const fs = require("fs"); //to access crt and key file 
const https = require("https"); //for https social login

const express = require("express");
const { engine } = require("express-handlebars");
const cors = require("cors");

const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const bcrypt = require("bcrypt");

const EventsRouter = require("./Routers/EventsRouter");
const EventsService = require("./Services/EventsService");
const UsersRouter = require("./Routers/UsersRouter");
const UsersService = require("./Services/UsersService");
const EventService = require("./Services/EventsService");
require("dotenv").config();
const port = 3000;

const setupPassport = require("./passport");
const AuthRouter = require("./Routers/passport-router");
const isLoggedIn = require('./middleware/isLoggedIn')

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname+'/public'));

app.engine("handlebars", engine({ defaultLayout:"main" }));
app.set("view engine", "handlebars");
app.use(flash());

app.use(
    session({
      secret: process.env.SECRET_KEY, //used to sign for sessions cookie
      resave: false,
      saveUninitialized: false,
    })
  );


setupPassport(app, bcrypt, passport, knex);
app.use("/", new AuthRouter(express, passport).router());

const userService = new UsersService(knex);
app.use("/user", new UsersRouter(userService, express).router());

const eventService = new EventService(knex);
app.use("/event", isLoggedIn.isLoggedIn, new EventsRouter(eventService, express).router());

// https.createServer(options, app).listen(port, () => {
//     console.log(`Listening on port ${port}`);
//   });s

const options = {
  cert: fs.readFileSync("./localhost.crt"),
  key: fs.readFileSync("./localhost.key"),
};

https
  .createServer(options, app)
  .listen(port, () => console.log(`Listening to port ${port}`));
