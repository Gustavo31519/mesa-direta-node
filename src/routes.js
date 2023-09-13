const { Router } = require("express");
const  db  = require("./services/mysql");
const allUser = require("./helpers/handleMysql");
const routes = Router();


routes.get("/select", async (req, res) => {
  try {
     res.json((await db.dbPromise.query(allUser))[0]);
  } catch (e) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

routes.post("/insert", async (req, res) => {
  try {
    const result = await db.dbPromise.query(
      "INSERT INTO user (name, email) VALUES (?, ?)",
      [clientInformations[0], clientInformations[1]]
    );
    res.json({
      message: "Usuário inserido com sucesso",
      insertedId: result[0].insertId,
    });
  } catch (e) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});



routes.post("/receber", async (req, res) => {
  const clientInformations = req.body.clientInformations;
  console.log("Informação recebida", clientInformations);

  try {
    const result = await db.dbPromise.query(
      "INSERT INTO user (name, email) VALUES (?, ?)",
      [clientInformations[0], clientInformations[1]]
    );
    console.log({
      message: "Usuário inserido com sucesso",
      insertedId: result[0].insertId,
    });
  } catch (e) {
    console.error("Erro interno do servidor:", e);
  }
});



module.exports = routes



