const express = require('express');
const router = express.Router();

//requerir controlador
const usersController = require('../controllers/userController');

//middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
//const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

//rutas

//acceso formulario registro
router.get('/register', guestMiddleware, usersController.register);

//procesar registro de usuario
router.post('/register', uploadFile.single('userImg'), validations, usersController.processRegister);


module.exports = router;