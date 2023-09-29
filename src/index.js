const express = require("express");
const routes = require("./routes");
const { port } = require("./services/mysql");
const smtp = require("./services/smtp");
const cors = require("cors");
const path = require("path");

//express
const app = express();
app.use(express.json());

//cors
app.use(cors());

app.use("/start", express.static(path.join(__dirname, "views/pages/start")));
app.use("/emails", express.static(path.join(__dirname, "views/pages/emails")));

//rotas
app.use(routes);
app.listen(port, () => console.log(`Running on http://localhost:${port}/start`));
