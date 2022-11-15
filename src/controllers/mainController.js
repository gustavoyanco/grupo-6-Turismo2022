const path = require ('path');
const fs = require ('fs')

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


var mainController = {
    index: (req, res) => {
        res.render('index', {products});
    },
    // login: (req, res) => {
    //     res.render('login');
    // },
    productCart: (req, res) => {
        res.render('productCart');
    },
    register: (req, res) => {
        res.render('register');
    },
   
}
module.exports = mainController;
