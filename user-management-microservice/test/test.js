var assert = require('assert');
var signin = require('../auth/auth').signIn
var register = require('../auth/auth').register
// var sendPayload = require('../auth/auth').sendPayload
var updateRecord = require('../auth/auth').updateRecord
var getJobList = require('../auth/auth').getJobList
var key = 'signin';
var userdata = { "email": "sharavi@iu.edu", "password": "test123!" };

let functionMap = {
	'signin': signin,
	'register': register,
	'updateRecord': updateRecord,
	'getJobList': getJobList
}
describe('Testing auth functions', function () {

	it('should return users email ID', function () {
		functionMap['signin'](userdata).then((data) => {
			console.log(data.user);
			assert.equal(userdata.email, data.user);

		}).catch((error) => {
			console.log(error);
		})
	});
});