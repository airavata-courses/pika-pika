const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var settings = require('../config/settings')
var passport = require('passport')

require('./passport')(passport)
// @route POST api/users
// @desc register new users
// @access Public 
router.post('/', [check('email', 'Please include a valid email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	console.log(req.body);
	const { email, password } = req.body;
	try {
		//Check if the user exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ erros: [{ msg: 'User already exists' }] })

		}
		user = new User({
			email,
			password
		})
		//Encrypt the password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();

		//Create a jwt token 
		const token = jwt.sign({
			iss: 'pika-pika',
			sub: user._id,
			exp: new Date().setDate(new Date().getDate() + 1)
		}, settings.secret);
		//Return the json web token

		return res.status(200).json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).send('Server errors')
	}


})

// @route POST api/users
// @desc Sign in existing users
// @access Public 

router.post('/signin', passport.authenticate('local', { session: false }), (req, res) => {
	const token = jwt.sign(req.user.toJSON(), settings.secret);
	return res.status(200).json({ token })
})


router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.send('Managed to get here')
})

module.exports = router;