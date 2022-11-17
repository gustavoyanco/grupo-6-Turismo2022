const fs = require ('fs');

const product = {
    fileName: './src/data/productsData.json',
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    findAll: function(){
        return this.getData();
    },
    findByPk: function (id) {
        let allProducts = this.findAll();
        let userFound = allProducts.find(oneProduct => oneProduct.id === id);
        return userFound;
    },
    findByField: function (field,text) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
        return productFound;
    },

}
module.exports = product