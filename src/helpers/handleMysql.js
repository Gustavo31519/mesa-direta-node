const allUser = 'SELECT * from user';
const insertUser = 'INSERT INTO user (name, email) VALUES (?, ?)'


module.exports = {allUser, insertUser}