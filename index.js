const express = require("express");
const { engine } = require("express-handlebars");
const cors = require('cors');

const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);

const EventsRouter = require("./Routers/EventsRouter");
const EventsService = require("./Services/EventsService");
const UsersRouter = require("./Routers/UsersRouter");
const UsersService = require("./Services/UsersService");
const EventService = require("./Services/EventsService");
const port = 9000;

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// app.use(flash());

const userService = new UsersService(knex)
app.use("/user", new UsersRouter(userService, express).router())

const eventService = new EventService(knex)
app.use("/event", new EventsRouter(eventService, express).router())

// https.createServer(options, app).listen(port, () => {
//     console.log(`Listening on port ${port}`);
//   });s

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})