const express = require('express');
const router = express.Router();

//requerir controlador
const usersController = require('../controllers/usersController');

//middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

//rutas

//acceso formulario registro
router.get('/register', guestMiddleware, usersController.register);

//procesar registro de usuario
router.post('/register', uploadFile.single('userImg'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, usersController.profile);

// Logout
router.get('/logout/', usersController.logout);


module.exports = router;