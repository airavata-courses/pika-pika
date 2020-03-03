var assert = require('assert');
var signin = require('../auth/auth').signIn
var register = require('../auth/auth').register
// var sendPayload = require('../auth/auth').sendPayload
var updateRecord = require('../auth/auth').updateRecord
var getJobList = require('../auth/auth').getJobList
var key = 'signin';
var userdata = { "email": "sharavi1@iu.edu", "password": "test123!" };

let functionMap = {
	'signin': signin,
	'register': register,
	'updateRecord': updateRecord,
	'getJobList': getJobList
}

describe('Testing auth functions', function () {

	it('should return users email ID', function () {
		functionMap['register'](userdata).then((data) => {
			console.log(data + " -- " + userdata);
			assert.equal(userdata.email, null);

		}).catch((error) => {
			console.log("error block :: " + data + " -- " + userdata);
			console.log(error);
		})
	});
});