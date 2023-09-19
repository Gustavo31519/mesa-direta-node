const { Router } = require("express");
const  db  = require("./services/mysql");
const {allUser, insertUser, updateUser} = require("./helpers/handleMysql");
const routes = Router();

routes.get("/select", async (req, res) => {
  try {
     res.json((await db.dbPromise.query(allUser))[0]);
  } catch (e) {
    res.status(500).json({ message: "Erro interno do servidor" });
  } 
});

routes.post("/receber", async (req, res) => {
  const clientInformations = req.body.clientInformations;
  console.log("Informação recebida " + clientInformations);

  try {
    await db.dbPromise.query(insertUser,
      [clientInformations[0], clientInformations[1]]
    );
  } catch (e) {
    console.error("Erro interno do servidor:", e);
  }
});

routes.post("/update", async (req, res) => {
  const clientUpdateInformations = req.body.clientUpdateInformations;
  console.log("Informação recebida " + clientUpdateInformations);

    try {
      await db.dbPromise.query(updateUser, [
        clientUpdateInformations[2],
        clientUpdateInformations[3],
        clientUpdateInformations[0],
        clientUpdateInformations[1]
      ]);
    } catch (e) {
      console.error("Erro interno do servidor:", e);
    }



})

  
module.exports = routes