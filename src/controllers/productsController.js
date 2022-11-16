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
        
        let imagen
		console.log(req.files);
		if(req.files[0] != undefined){
			imagen = req.files[0].filename
		} else {
			imagen = 'default-image.png'
		}

        let newProduct = {
            id: products[products.length - 1].id + 1,
            ... req.body,
            imagen: imagen
        }
        products.push (newProduct)
        fs.writeFileSync (productsFilePath, JSON.stringify(products, null, ' '))
        res.redirect ('/')
    },
    edit: (req, res) => {
        let {id} = req.params
        let productoEditar = products.find (product =>product.id == id)
        res.render ('editProduct', {products:productoEditar})
    },
    update:(req, res) => {
        let {id} = req.params
        let productoEditar = products.find (product =>product.id == id)

        productoEditar = {
            id: productoEditar.id,
            ...req.body,
            image: 'default-image.png'
        }

        let productoEditado = products.map (product => {
            if (product.id == productoEditar.id){
                return product = {...productoEditar}
            }
            return product
        })

        fs.writeFileSync (productsFilePath, JSON.stringify (productoEditado, null, ' '))
        res.redirect ('/')

    },
    destroy: (req,res) => {
        let id = req.params.id
        let productosFinales = products.filter (product => product.id != id)
        fs.writeFileSync (productsFilePath, JSON.stringify (productosFinales, null, ' '))

        res.redirect ("/")
    }    
}

module.exports = controller