const fs = require('fs')

const logDB = (req, res, next)=>{
    fs.appendFileSync('logDB.txt', 'Foi criado o registro pela url: '+ req.url)
    next()
}
module.exports = {
    logDB
}