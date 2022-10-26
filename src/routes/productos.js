
const express = require('express');
const router = express.Router()  ;
const productsController = require ('../controllers/productsController')

// Pagina de productos
router.get ('/', productsController.index);

// Creación de productos
router.get ('/create', productsController.create);
router.post ('/', productsController.store);

// Detalle de producto
router.get ('/:id', productsController.detail);

// Edición de producto
router.get ('/:id/edit', productsController.edit);
router.put ('/', productsController.update);

// Eliminación de producto
router.delete('/delete/:id', productsController.destroy)




module.exports = router;