const express = require("express");
const routes = require("./routes");
const { port } = require("./services/mysql");
const cors = require("cors")


//express
const app = express();
app.use(express.json());

//cors
app.use(cors())



//rotas
app.use(routes);
app.listen(port, () => console.log(`Running on http://localhost:${port}`));
