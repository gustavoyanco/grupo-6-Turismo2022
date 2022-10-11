
const express = require('express');

const router = express.Router()  ;

router.get('/:idproductos', function(req, res) {
    res.send ("Esto es el detalle del producto" + req.params.idProducto) ; 
}) ;

module.exports = router ;