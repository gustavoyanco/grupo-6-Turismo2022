const express = require ('express');
const app = express();
const path = require ('path');
const methodOverride = require ('method-override')

// Routes requeridas
const mainRouter = require ('./routes/mainRoute');
const rutasProductos = require('./routes/productos.js');
const rutasUsers = require('./routes/users.js');


// Configuración APP

app.use(express.static(path.resolve(__dirname,'../public'))); // Archivos estáticos
app.use(express.urlencoded({ extended: false })); // Procesamiento de formularios
app.use(express.json()); // Lecturas de JSON
app.use(methodOverride('_method')) // Configuración Put y Delete



app.set('views',path.join(__dirname, 'views')); // Configuración carpeta views
app.set('view engine','ejs'); // Tabajo de ejs


// Ruta Main
app.use('/',mainRouter);

//Ruta Productos 
app.use('/productos', rutasProductos);

// Ruta Users
app.use ('/users', rutasUsers)

// Lanzamiento del servidor
app.listen(process.env.PORT || 3200, () => {
    console.log('Servidor corriendo en puerto 3200')
});

