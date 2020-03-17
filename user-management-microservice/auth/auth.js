const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var settings = require('../config/settings')


let register = async (data) => {
	console.log("inside register auth ")
	const email = data.email;
	const password = data.password
	console.log(email + ",," + password)
	try {
		//Check if the user exists
		let user = await User.findOne({ email });
		console.log(user);
		if (user) {
			console.log("User already exists")
			throw new Error("User already exists")
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
		console.log(token);
		//Return the json web token
		return { token: token, user: email }
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
		var email = data.email;
		let user = await User.findOne({ email });
		if (user) {
			bcrypt.compare(req.user.password, user.password, function (err, res) {
				if (err) {
					// handle error
					throw new Error("Server Error");
				}
				if (res) {
					const token = jwt.sign(req.user, settings.secret);
					return { token: token, user: data.email }
					// Send JWT
				} else {
					// response is OutgoingMessage object that server response http request
					throw new Error('passwords do not match');
				}
			});
		} else {
			throw new Error("User does not exist")
		}

	} catch (error) {
		console.log(error);
		throw new Error("Server Error")
	}
}

let updateRecord = async (data) => {

	const jobId = data.jobId
	const email = data.email
	var query = { "email": email }

	let user = await User.findOne({ email });
	if (user) {
		User.update(
			{ email: email },
			{ $push: { jobId: jobId } }
		).then((data) => {
			console.log(data)
			return data
		}).catch((error) => {
			throw new Error(error)
		})
	}
}

let getJobList = async (data) => {
	const email = data.email
	var query = { "email": email }

	let user = await User.findOne({ email });
	if (user) {
		return user.jobId
	}
	else {
		throw new Error("User not found!")
	}
}

module.exports = { signIn, register, updateRecord, getJobList }