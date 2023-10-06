const express = require("express");
const routes = require("./routes");
const { port } = require("./services/mysql");
const smtp = require("./services/smtp");
const cors = require("cors");
const path = require("path");
const session = require("express-session");


//express
const app = express();
app.use(express.json());

//cors
app.use(cors());

//authenticate
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);


//rotas
app.use(routes);
app.listen(port, () => console.log(`Running on http://localhost:${port}/start`));
