const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    
    index: (req, res) => {
		res.render ("products", {products})
	},
    detail:(req, res) => {
        let {id} = req.params
        let productoEncontrado = products.filter (product => product.id == id)
		res.render ("productDetail")
    },    
    create: (req, res) => {
		res.render ("addProduct")
	},
    store: (req, res) => {
        let newProduct = {
            id: products[products.length - 1].id + 1,
            ... req.body,
            imagen:'default-image.png'
        }
        products.push (newProduct)
        fs.writeFileSync (productsFilePath, JSON.stringify(products, null, ' '))
        res.redirect ('/')
    },
    edit: (req, res) => {
        res.render ('editProduct')
    },
    update:(req, res) => {
        console.log (req.body)
        res.redirect ('/')
    },    
}

module.exports = controller