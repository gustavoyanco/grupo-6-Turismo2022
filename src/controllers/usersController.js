const fs = require('fs');
const path = require('path');
const bcrypt = require ('bcryptjs')

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

        newUser.password = bcrypt.hashSync (req.body.password, 10)
        delete newUser.rePassword
       
        let usersNews = [...users, newUser]
        fs.writeFileSync (usersFilePath, JSON.stringify(usersNews, null, ' '))
        res.redirect ('/') 
    },
    login: (req, res) => {
        res.render ('login')
    }          
}

module.exports = controller;