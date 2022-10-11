const express = require ('express');
const rutasProductos = require('./routes/productos.js');
const app = express();
const path = require ('path');


const mainRouter = require ('./routes/mainRoute');

app.use(express.static(path.resolve(__dirname,'../public')));
 

app.use('/',mainRouter);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use('/productos', rutasProductos);

app.listen(process.env.PORT || 3200, () => {
    console.log('Servidor corriendo en puerto 3200')
});