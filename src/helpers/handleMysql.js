const allUser = 'SELECT * from user';
const insertUser = 'INSERT INTO user (name, email) VALUES (?, ?)'
const updateUser = "UPDATE USER SET name = ?, email = ? WHERE name = ? AND email = ?"



module.exports = {allUser, insertUser, updateUser}