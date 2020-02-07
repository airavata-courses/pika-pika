const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var settings = require('../config/settings')

let register = async (data) => {
	const email = data.email;
	const password = data.password
	try {
		//Check if the user exists
		let user = await User.findOne({ email });
		if (user) {
			console.log("User already exists")

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

		return token
	} catch (error) {
		throw new Error("Server Error")
	}
}
let signIn = async (data) => {
	const req = {
		user: {
			email: data.email,
			password: data.password
		}
	}
	try {
		const token = jwt.sign(req.user, settings.secret);
		return token;
	} catch (error) {
		throw new Error("Server Error")
	}
}
module.exports = { signIn, register }