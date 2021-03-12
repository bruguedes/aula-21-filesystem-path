const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt');
const filePath = path.join('static-database', 'db.json');



const getUsers = ()=>{
  const data = fs.existsSync(filePath)?fs.readFileSync(filePath): []

  try{
      return JSON.parse(data)
  }catch(error){
       return []
  }
}






const index = (req, res) => {
  res.render('login/index');
}

const submit = (req, res) => {
  const tableOfUsers =JSON.parse(fs.readFileSync(filePath, {encoding: 'utf-8'}))
  let userFilter = tableOfUsers.filter(user=> user.email === req.body.email )
  if(userFilter.length<=0){
     return res.render('login/authenticationError',{msg:"E-mail invalido"})
  }else{
    bcrypt.compareSync(req.body.password, userFilter[0].password)?res.redirect('/login/userList'):res.render('login/authenticationError',{msg:"Senha inválida"})
  }

}

const cadastro = (req, res) => {
  res.render('login/cadastro');
}

const novoCadastro = (req, res) => {
  const dadosJsonParse = getUsers()
  dadosJsonParse.push({ email:req.body.email, password: bcrypt.hashSync(req.body.password, 10)})
  fs.writeFileSync(filePath, JSON.stringify(dadosJsonParse, null, '\t'))
  res.redirect('/login');
}
const usersList = (req, res) => {
  const users = getUsers()
  res.render('login/userList',{users});
}


module.exports = {
  index,
  submit,
  cadastro,
  novoCadastro,
  usersList,
  
}