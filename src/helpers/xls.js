const XLSX = require("xlsx")

const workbook = XLSX.readFile("src/dados.xlsx")
console.log(workbook)

const sheet_name_list = workbook.SheetNames
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
const values = data.map(user => ` ('${user.nome}', '${user.email}')`).join(', ');



/* let insertXlsxUser = "INSERT INTO user (name, email) VALUES"


    try {
        await db.dbPromise.querry(insertXlsxUser + values)
    } catch (e) {
      console.error("Erro interno do servidor:", e);
      res.status(500).send("Erro interno do servidor");
    } */


