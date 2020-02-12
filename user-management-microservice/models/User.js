const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	jobId: {
		type: Array
	}
});
UserSchema.methods.isValidPassword = async function (pwd) {
	try {
		return await bcrypt.compare(pwd, this.password);
	} catch (error) {
		console.log(error)
	}
}

module.exports = User = mongoose.model('user', UserSchema);