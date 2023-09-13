const { Router } = require("express");
const  db  = require("./services/mysql");
const allUser = require("./helpers/handleMysql");
const routes = Router();


routes.get("/", async (req, res) => {
  try {
     res.json((await db.dbPromise.query(allUser))[0]);
  } catch (e) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});




module.exports = routes