const { User } = require('../models/User');
const { signIn } = require('./signIn');
const { signUp } = require('./signUp');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(null, user);
			return null;
		});
	});

	signIn(passport);
	signUp(passport);
};
