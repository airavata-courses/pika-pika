// const passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy;
var { ExtractJwt } = require('passport-jwt');
var LocalStartegy = require('passport-local').Strategy
var settings = require('../config/settings')
const User = require('../models/User')

module.exports = function (passport) {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
	opts.secretOrKey = settings.secret;
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ id: jwt_payload.id }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));

	passport.use(new LocalStartegy({ usernameField: 'email' }, async function (email, password, done) {
		try {
			//Find the user by email
			console.log('came to local')
			const user = await User.findOne({ email });
			//console.log(user)
			if (!user) {
				console.log("false")
				return done(null, false);
			}
			//Password check
			const isMatch = await user.isValidPassword(password);
			console.log(isMatch);
			if (!isMatch) {
				return done(null, false)
			}
			done(null, user)
		} catch (error) {
			done(error, false);
		}

	}))

};

//module.exports = passport