const XLSX = require("xlsx");

function uploadArchive(file) {
  const workbook = XLSX.readFile(file);
  const sheet_name_list = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
const values = data
  .map((user) => ` ('${user.name}', '${user.email}', '${user.group_id}')`)
  .join(", ");

  return values;
}

module.exports = uploadArchive;


