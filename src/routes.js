const { Router } = require("express");
const db = require("./services/mysql");
const {
  allUser,
  insertUser,
  updateUser,
  deleteUser,
  insertXlsxUser,
} = require("./helpers/handleMysql");
const routes = Router();
const smtp = require("./services/smtp");
const path = require("path");
const multer = require("multer");
const uploadArchive = require("./helpers/xls");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const cron = require("node-cron");
const cronDate = require("./services/crom");
const express = require("express");
const auth = require("./middlewares/auth");

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
    await db.dbPromise.query(insertUser, [
      clientInformations[0],
      clientInformations[1],
      clientInformations[2],
    ]);
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
      clientUpdateInformations[1],
    ]);
  } catch (e) {
    console.error("Erro interno do servidor:", e);
    res.status(500).send("Erro interno do servidor");
  }
});

routes.post("/delete", async (req, res) => {
  const clientDeleteInformations = req.body.clientDeleteInformations;
  console.log("Informação recebida " + clientDeleteInformations);

  try {
    await db.dbPromise.query(deleteUser, [
      clientDeleteInformations[0],
      clientDeleteInformations[1],
    ]);
  } catch (e) {
    console.error("Erro interno do servidor:", e);
    res.status(500).send("Erro interno do servidor");
  }
});

routes.post("/sendmail", (req, res) => {
  const emailInformations = req.body.emailInformations;
  console.log(emailInformations);

  let mailOptions = {
    from: emailInformations.from,
    to: emailInformations.element,
    subject: emailInformations.subject,
    html: emailInformations.html,
  };

  if (isNaN(Date.parse(emailInformations.date))) {
    smtp.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Erro ao enviar o e-mail.");
      } else {
        console.log("E-mail enviado: " + info.response);
        res.send("E-mail enviado com sucesso!");
      }
    });
  } else {
    cron.schedule(cronDate(emailInformations.date), () => {
      smtp.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Erro ao enviar o e-mail.");
        } else {
          console.log("E-mail enviado: " + info.response);
          res.send("E-mail enviado com sucesso!");
        }
      });
    });
  }
});

const mailUser = process.env.MAIL_USER;
routes.get("/header", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/header.html"));
});

routes.get("/mailUser", (req, res) => {
  res.json({ mailUser });
});

routes.post("/upload-xlsx", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    console.log("arquivo recebido", file);

    const values = uploadArchive(file.path);

    await db.dbPromise.query(insertXlsxUser + values);

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Erro ao excluir o arquivo:", err);
      } else {
        console.log("Arquivo excluído com sucesso");
      }
    });

    res.json({ message: "Arquivo enviado com sucesso!" });
  } catch (error) {
    console.error("Erro interno do servidor:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

routes.use(express.urlencoded({ extended: true }));

routes.post("/auth", auth, async (req, res) => {
  res.redirect("/start");
});

routes.use(
  "/start",
  auth,
  express.static(path.join(__dirname, "views/pages/start"))
);
routes.use(
  "/emails",
  auth,
  express.static(path.join(__dirname, "views/pages/emails"))
);
routes.use("/login", express.static(path.join(__dirname, "views/pages/login")));

module.exports = routes;
