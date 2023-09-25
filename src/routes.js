const { Router } = require("express");
const  db  = require("./services/mysql");
const {allUser, insertUser, updateUser, deleteUser} = require("./helpers/handleMysql");
const routes = Router();
const smtp = require("./services/smtp");
const path = require("path");

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
      [clientInformations[0], clientInformations[1], clientInformations[2]]
    );
  } catch (e) {
    console.error("Erro interno do servidor:", e);
    res.status(500).send("Erro interno do servidor");
  }
});

routes.post("/update", async (req, res) => {
  const clientUpdateInformations = req.body.clientUpdateInformations;
  console.log("Informação recebida " + clientUpdateInformations);

    try {
      await db.dbPromise.query(updateUser, [
        clientUpdateInformations[2],
        clientUpdateInformations[3],
        clientUpdateInformations[4],
        clientUpdateInformations[0],
        clientUpdateInformations[1]
      ]);
    } catch (e) {
      console.error("Erro interno do servidor:", e);
      res.status(500).send("Erro interno do servidor");
    }
})

routes.post("/delete", async (req,res) => {
    const clientDeleteInformations = req.body.clientDeleteInformations;
    console.log("Informação recebida " + clientDeleteInformations);

    try {
      await db.dbPromise.query(deleteUser, [
        clientDeleteInformations[0],
        clientDeleteInformations[1]
      ]);
    } catch (e) {
      console.error("Erro interno do servidor:", e);
      res.status(500).send("Erro interno do servidor");
    }
})

routes.post('/sendmail', (req, res) => {
  const emailInformations = req.body.emailInformations
  console.log(emailInformations)
  
  let mailOptions = {
    from: emailInformations.from,
    to: emailInformations.to,
    subject: emailInformations.subject,
    html: emailInformations.html,
  }
    smtp.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Erro ao enviar o e-mail.");
    } else {
      console.log("E-mail enviado: " + info.response);
      res.send("E-mail enviado com sucesso!");
    }
  });
})

routes.get('/header', (req,res) => {
  res.sendFile(path.join(__dirname, '/views/header.html'))
})



module.exports = routes