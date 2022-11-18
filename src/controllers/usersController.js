const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/usersData.json');
const User = require('../models/User');

const controller = {
	register: (req, res) => {
		res.render('register');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Esta dirección de email ya está registrada'
					}
				},
				oldData: req.body
			});
		}
		let userToCreate = {
			...req.body,
			password: bcrypt.hashSync(req.body.password, 10),
			userImage: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/login');

	},


	login: (req, res) => {
		return res.render('login')
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);

		if (userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if (req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/login');
			}
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	// profile: (req, res) => {
	// 	return res.render('userProfile', {
	// 		user: req.session.userLogged
	// 	});
	// },

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	//a eliminar
	// create: (req, res) => {

	//     let imagen

	// 	if(req.files[0] != undefined){
	// 		imagen = req.files[0].filename
	// 	} else {
	// 		imagen = 'default-image.png'
	// 	}

	//     let newUser = {
	//         id: users[users.length - 1].id + 1,
	//         ... req.body,
	//         imagen: imagen
	//     }

	//     newUser.password = bcrypt.hashSync (req.body.password, 10)
	//     delete newUser.rePassword

	//     let usersNews = [...users, newUser]
	//     fs.writeFileSync (usersFilePath, JSON.stringify(usersNews, null, ' '))
	//     return res.redirect ('/') 
	// },
	autenticate: (req, res) => {

		const { email, password } = req.body;

		let user = user.find(user => user.email == email)

		if (user) {

			if (bcrypt.compareSync(password, user.password)) {

				delete user.password;

				req.session.user = user
			};
		} else {
			return res.render('login', {
				old: req.body,
				errors: {
					email: "El email o la contraseña son invalidos"
				}
			});
		}


	}
}

module.exports = controller;