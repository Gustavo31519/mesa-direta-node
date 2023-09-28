<<<<<<< HEAD
const XLSX = require("xlsx");

function uploadArchive(file) {
  const workbook = XLSX.readFile(file);
  const sheet_name_list = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  const values = data
    .map((user) => ` ('${user.nome}', '${user.email}')`)
    .join(", ");

  return values;
}

module.exports = uploadArchive;


=======
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


>>>>>>> f6760b32a22d6e47cb34d81f1c26b525938b8c40
