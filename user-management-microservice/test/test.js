var assert = require('assert');
var signin = require('../auth/auth').signIn
var register = require('../auth/auth').register
var updateRecord = require('../auth/auth').updateRecord
var getJobList = require('../auth/auth').getJobList
var key = 'signin';
var userdata = { "email": "sharavi@iu.edu", "password": "test123!" };
var userUpdate = { "email": "sharavi@iu.edu", "jobId": "29f69330-4be9-11ea-bc00-6b5c8d8055dd" };


let functionMap = {
	'signin': signin,
	'register': register,
	'updateRecord': updateRecord,
	'getJobList': getJobList
}

describe('Testing register function', function () {

	it('should return users email ID', function () {
		functionMap['register'](userdata).then((data) => {
			console.log(data.email + " -- " + userdata);
			assert.equal(userdata.email, data.user);

		}).catch((error) => {
			console.log("error block :: " + data + " -- " + userdata);
			console.log(error);
		})
	});
});


describe('Testing sign in functions', function () {

	it('should return users email ID', function () {
		functionMap['signin'](userdata).then((data) => {
			assert.equal(userdata.email, data.user);

		}).catch((error) => {
			console.log(error);
		})
	});
});

describe('Testing getJobList function', function () {

	it('should return users jobID', function () {
		functionMap['getJobList'](userdata).then((data) => {
			//console.log(JSON.stringify(data));
			assert.equal(36, data.length);

		}).catch((error) => {
			console.log(error);
		})
	});
});

describe('Testing updateRecord function', function () {

	it('should return users jobIDs', function () {
		functionMap['updateRecord'](userUpdate).then((data) => {
			console.log(JSON.stringify(data));
			assert.equal(36, data.length);

		}).catch((error) => {
			console.log(error);
		})
	});
});