const express = require ('express');
const app = express();
const path = require ('path');

const mainRouter = require ('./routes/mainRoute');

app.use(express.static(path.resolve(__dirname,'../public')));

app.use('/',mainRouter);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.listen(3200, () => {
    console.log('Servidor corriendo en puerto 3200')
});