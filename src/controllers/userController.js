const bcryptjs = require('bcrypt');

const {validationResult} = require('express-validator');

const user = require('../models/User');

const controller = {
    register: (req, res) => {
        res.render('registerForm');
    },
    processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			res.render('registerForm', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = user.findByField('email', req.body.email);

		if (userInDB) {
			res.render('registerForm', {
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
			password: bcryptjs.hashSync(req.body.password, 10),
			userImg: req.file.filename
		}

		let userCreated = user.create(userToCreate);

		res.redirect('/registerForm');

}
}

module.exports = controller;