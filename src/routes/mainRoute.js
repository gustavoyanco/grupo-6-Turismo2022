const express = require ('express');
const mainController = require('../controllers/mainController');
var router = express.Router();

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/productCart', mainController.productCart);
router.get('/productDetail', mainController.productDetail);
router.get('/register', mainController.register);
router.get('/addProduct', mainController.addProduct);

module.exports = router;