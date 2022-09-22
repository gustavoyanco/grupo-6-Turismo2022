const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(3200, () => {
    console.log('Servidor corriendo en puerto 3200')
});
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/views/index.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/views/register.html'));
});
app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/views/productDetail.html'));
});
app.get('/productCart', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/views/productCart.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/views/login.html'));
});
