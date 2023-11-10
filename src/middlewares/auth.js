const auth = (req, res, next) => {
require("dotenv").config();
  
  const { username, password } = req.body;
 
  if (
    username === process.env.SIGN_USER &&
    password === process.env.SIGN_PASS
  ) {
    req.session.authenticated = true;
    
  }
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = auth;
