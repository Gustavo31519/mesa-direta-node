const express = require("express");
const router = require("./routes");
const { port } = require("./services/mysql");

//express
const app = express();
app.use(express.json());

//rotas
app.use(router);
app.listen(port, () => console.log(`Running on http://localhost:${port}`));
