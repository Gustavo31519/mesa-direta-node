const allUser = 'SELECT * from user';
const insertUser = 'INSERT INTO user (name, email, createdAt) VALUES (?, ?, ?)'
const updateUser = "UPDATE USER SET name = ?, email = ?, updatedAT = ? WHERE name = ? AND email = ?"
const deleteUser  = "DELETE FROM user WHERE name = ? AND email = ?"
const insertXlsxUser = "INSERT INTO user (name, email) VALUES";
const groupSelect = "SELECT * from group_names"



module.exports = {allUser, insertUser, updateUser, deleteUser, insertXlsxUser, groupSelect}