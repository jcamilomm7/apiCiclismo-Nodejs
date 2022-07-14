const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { API_VERSION } = require("./config");

//middlewares

//load routings
const cyclingroutes = require("./routers/cyclingTeamRouters");
const cyclistsroutes = require("./routers/cyclistsRouters");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Router basic
app.use(`/api/${API_VERSION}`, cyclingroutes);
app.use(`/api/${API_VERSION}`, cyclistsroutes);

module.exports = app;
