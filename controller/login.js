const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const filePath = path.join("static-database", "db.json");
const {check, validationResult, body} = require('express-validator')

const getJson = () => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  return JSON.parse(data);
};
const getDataUser = (email, array) => {
  return array.filter((user) => user.email === email);
};

const emailExist = (email)=>{
  const users = getJson();
    let [user] = getDataUser(email, users);
    if(!user){
      return true
    }
    return false
    
}

const index = (req, res) => {
  res.render("login/index");
};

const submit = (req, res) => {
  const { email, password } = req.body;
  const users = getJson();
  let [user] = getDataUser(email, users);

  if (!user) {
    return res.render("login/authenticationError", { msg: "E-mail invalido" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.render("login/authenticationError", { msg: "Senha inválida" });
  }
  res.redirect("/login/userList");
};

const cadastro = (req, res) => {
  res.render("login/cadastro");
};

const novoCadastro = (req, res) => {
  let erroValidation = validationResult(req);
  if (erroValidation.isEmpty()) {
    const { email, password } = req.body;
    const users = getJson();
    const newPassword = bcrypt.hashSync(password, 10);
    users.push({ email, password: newPassword });
    fs.writeFileSync(filePath, JSON.stringify(users));
    return res.redirect("/login");
  } 
    res.render('login/cadastro', {errors:erroValidation.errors});
  
};
const usersList = (req, res) => {
  const users = getJson();
  res.render("login/userList", { users });
};

module.exports = {
  index,
  submit,
  cadastro,
  novoCadastro,
  usersList,
  emailExist,
};
