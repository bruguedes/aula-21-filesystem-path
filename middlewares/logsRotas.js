const fs = require('fs')

const logRoutes = (req, res, next)=>{
    fs.appendFileSync('log.txt', 'O usuario acessou a url: '+ req.url)
    next()
}
module.exports = {
    logRoutes
}