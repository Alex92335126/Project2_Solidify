const express = require("express");
const { engine } = require("express-handlebars");

const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);

const EventsRouter = require("./Routers/EventsRouter");
const EventsService = require("./Services/EventsService");
const UsersRouter = require("./Routers/UsersRouter");
const UsersService = require("./Services/UsersService");
const port = 9000;