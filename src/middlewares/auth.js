const auth = (req, res, next) => {
  
  
  const { username, password } = req.body;
  
 
  if (
    username === process.env.SIGN_USER &&
    password === process.env.SIGN_PASS
  ) {
    c = true;
    
  }
  if (req.session.authenticated) {
    next();
     console.log("Hello World");
  } else {
    res.redirect("/login");
    console.log("Senha Incorreta");
  }
};

module.exports = auth;
