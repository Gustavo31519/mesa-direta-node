const allUser = 'SELECT * from user';
const insertUser = 'INSERT INTO user (name, email, createdAt, group_id) VALUES (?, ?, ?, ?)'
const updateUser = "UPDATE USER SET name = ?, email = ?, updatedAT = ?, group_id = ? WHERE name = ? AND email = ?"
const deleteUser  = "DELETE FROM user WHERE name = ? AND email = ?"
const insertXlsxUser = "INSERT INTO user (name, email) VALUES";
const groupSelect = "SELECT * FROM user WHERE group_id = ?";
const deleteGroupQuerry = "DELETE FROM user WHERE CAST(group_id AS BINARY) = ?"



module.exports = {allUser, insertUser, updateUser, deleteUser, insertXlsxUser, groupSelect, deleteGroupQuerry}