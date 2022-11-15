
const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require ('path');

const productsController = require ('../controllers/productsController');


// Multer : para subir imagenes
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null,  path.join ('/Users/Nicolas León/Desktop/grupo-6-Turismo2022/public/images'));
    },
    filename: (req, file, cb) => {
        let imageName = file.fieldname + '-' + Date.now() + path.extname (file.originalname);
        cb(null, imageName);
    },
});

const upload = multer ({storage});

// Pagina de productos
router.get ('/', productsController.index);

// Creación de productos
router.get ('/create', productsController.create);
router.post ('/', upload.any(), productsController.store);

// Detalle de producto
router.get ('/:id', productsController.detail);

// Edición de producto
router.get ('/edit/:id', productsController.edit);
router.put ('/edit/:id', productsController.update);

// Eliminación de producto
router.delete('/delete/:id', productsController.destroy)




module.exports = router;