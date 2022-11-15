const express = require('express');
const router = express.Router();
const multer = require ('multer')
const path = require ('path')

const usersController = require ('../controllers/usersController')

// Multer : para subir imagenes
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null,  path.join ('/Users/Nicolas León/Desktop/grupo-6-Turismo2022/public/images/usersImages'));
    },
    filename: (req, file, cb) => {
        let imageName = file.fieldname + '-' + Date.now() + path.extname (file.originalname);
        cb(null, imageName);
    },
});

const upload = multer ({storage});

// router.get ('/', usersController.index)
router.get ('/register', usersController.register)
router.post ('/register',upload.any(), usersController.create)
router.get ('/login', usersController.login)
router.get ('/login', usersController.autenticate)

module.exports = router