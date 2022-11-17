const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

const path = require('path');
const methodOverride = require('method-override')
const app = express();

const userLogged = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false,
}));

// Configuración APP
app.use(cookies());// uso de cookies
app.use(userLogged);// usuario activo
app.use(express.static(path.resolve(__dirname, '../public'))); // Archivos estáticos
app.use(express.urlencoded({ extended: false })); // Procesamiento de formularios
app.use(express.json()); // Lecturas de JSON
app.use(methodOverride('_method')) // Configuración Put y Delete
app.set('views', path.join(__dirname, 'views')); // Configuración carpeta views
app.set('view engine', 'ejs'); // Tabajo de ejs

// Routes requeridas
const mainRouter = require('./routes/mainRoute');
const rutasProductos = require('./routes/productos.js');
const rutasUsers = require('./routes/users.js');
//const userRoutes = require('./routes/userRoutes');

// Ruta Main
app.use('/', mainRouter);

//Ruta Productos 
app.use('/productos', rutasProductos);

// Ruta Users
app.use('/users', rutasUsers)
//app.use('/user', userRoutes);

// Lanzamiento del servidor
app.listen(process.env.PORT || 3200, () => {
    console.log('Servidor corriendo en puerto 3200')
});

