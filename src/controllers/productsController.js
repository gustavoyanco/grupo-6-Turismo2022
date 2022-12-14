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
        let productoEncontrado = products.find (product => product.id == id)
		res.render ("productDetail", {products:productoEncontrado})
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
        let {id} = req.params
        let productoEditar = products.find (product =>product.id == id)
        res.render ('editProduct', {product:productoEditar})
    },
    update:(req, res) => {
        let {id} = req.params
        let productoEditar = products.find (product =>product.id == id)

        // productoEditar = {
        //     id: productoEditar.id,
        //     ...req.body,
        //     imagen: productoEditar.imagen
        // }

        // let nuevosProductos = products.map (product => {
        //     if (product.id == productoEditar.id){
        //         return product = {...productoEditar}
        //     }
        //     return product
        // })
        // fs.writeFileSync (productsFilePath, JSON.stringify (nuevosProductos, null, ' ' ))
        res.redirect ('/')
    },
    destroy: (req,res) => {
        let id = req.params.id
        let productosFinales = products.filter (product => product.id != id)
        
        fs.writeFileSync (productsFilePath, JSON.stringify (productosFinales, null, ' ' ))
        res.redirect ("/")
    }    
}

module.exports = controller