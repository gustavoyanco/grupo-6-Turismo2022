const express = require ('express');
const mainController = require('../controllers/mainController');
var router = express.Router();

router.get('/', mainController.index);
// router.get('/login', mainController.login);
router.get('/productCart', mainController.productCart);
router.get('/register', mainController.register);


module.exports = router;