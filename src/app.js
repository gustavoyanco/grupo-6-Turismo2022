const express = require ('express');
const app = express();
const path = require ('path');
const methodOverride = require ('method-override')


const mainRouter = require ('./routes/mainRoute');
const rutasProductos = require('./routes/productos.js');

app.use(express.static(path.resolve(__dirname,'../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))


app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');


// Ruta Main
app.use('/',mainRouter);

//Ruta Productos 
app.use('/productos', rutasProductos);


app.listen(process.env.PORT || 3200, () => {
    console.log('Servidor corriendo en puerto 3200')
});

