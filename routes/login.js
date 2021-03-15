const express = require('express');
const router = express.Router();
const controller = require('../controller/login')
const logDBMiddlewares = require('../middlewares/logDB')
const {check, validationResult, body} = require('express-validator')

// GET /login
router.get('/', controller.index);

// POST /login/entrar
router.post('/entrar',  controller.submit);

// GET /login/cadastro
router.get('/cadastro', controller.cadastro);

// POST /login/cadastro
router.post('/cadastro', logDBMiddlewares.logDB,[
    
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min:3}).withMessage('Senha deve conter minimo 3 caracteres'),
    body('email').custom(email =>{
        return controller.emailExist(email)
    }).withMessage('Email já cadastrado!')

], controller.novoCadastro);

// GET /login/listaUsuário
router.get('/userList', controller.usersList);


module.exports = router;