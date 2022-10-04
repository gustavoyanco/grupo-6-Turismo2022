const path = require ('path');

var mainController = {
    index: (req, res) => {
        res.render('index',);
    },
    login: (req, res) => {
        res.render('login');
    },
    productCart: (req, res) => {
        res.render('productCart');
    },
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    register: (req, res) => {
        res.render('register');
    },
    addProduct: (req, res) => {
        res.render('addProduct');
    },
}
module.exports = mainController;
