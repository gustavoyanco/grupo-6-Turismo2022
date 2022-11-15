const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        res.render ('users');
    },
    register:(req, res) => {
        res.render ('register');
    },
    create: (req, res) => {

        let imagen
		console.log(req.files);
		if(req.files[0] != undefined){
			imagen = req.files[0].filename
		} else {
			imagen = 'default-image.png'
		}

        let newUser = {
            id: users[users.length - 1].id + 1,
            ... req.body,
            imagen: imagen
        }
        console.log (newUser)
        users.push (newUser)
        fs.writeFileSync (usersFilePath, JSON.stringify(users, null, ' '))
        res.redirect ('/')
       
    }       
}

module.exports = controller;