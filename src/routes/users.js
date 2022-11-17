const express = require('express');
const router = express.Router();
const multer = require ('multer')
const path = require ('path')

const usersController = require ('../controllers/usersController')

//middlewares
const upload = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

// router.get ('/', usersController.index)
router.get ('/register', guestMiddleware, usersController.register)
router.post ('/register',upload.any(), validations, usersController.processRegister)
router.get ('/login', usersController.login)
router.get ('/login', usersController.autenticate)

module.exports = router