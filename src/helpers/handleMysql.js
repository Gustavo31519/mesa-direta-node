const allUser = 'SELECT * from user';
const insertUser = 'INSERT INTO user (name, email, createdAt, group_id) VALUES (?, ?, ?, ?)'
const updateUser = "UPDATE USER SET name = ?, email = ?, updatedAT = ? WHERE name = ? AND email = ?"
const deleteUser  = "DELETE FROM user WHERE name = ? AND email = ?"
const insertXlsxUser = "INSERT INTO user (name, email) VALUES";
const groupSelect = "SELECT * FROM user WHERE group_id = ?";



module.exports = {allUser, insertUser, updateUser, deleteUser, insertXlsxUser, groupSelect}