const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');

const User = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	salt: {
		type: String,
	},
	googleID: String,
	facebookID: String,
	twitterID: String,
	userPhoto: String,
	registrationDate: String,
	lastActivityDate: String,
	activateToken: String,
	isRemoved: {
		type: Boolean,
		default: false
	}
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

User.pre('save', function (next) {
	const userData = this;
	if (!userData.isModified('password')) return next();

	bcrypt.genSalt(10)
		.then(salt => {
			userData.salt = salt;
			bcrypt.hash(this.password, salt)
				.then(hash => {
					userData.password = hash;
					next();
				})
				.catch(err => {
					next(err);
				});
		})
		.catch(err => {
			next(err);
		});
});

User.pre('update', function (next) {
	const fields = this._update.$set;
	if (!fields || !fields.password) return next();

	bcrypt.genSalt(10)
		.then(salt => {
			fields.salt = salt;
			bcrypt.hash(fields.password, fields.salt)
				.then(hash => {
					fields.password = hash;
					next();
				})
				.catch(err => {
					next(err);
				});
		})
		.catch(err => {
			next(err);
		});
});

class UserMethods {
	checkPassword (password) {
		return new Promise((resolve, reject) => {
			bcrypt.hash(password)
				.then(hash => {
					resolve(hash === this.password)
				})
				.catch(err => {
					reject(err);
				});
		});
	};

	checkToken (token) {
		return this.activateToken === token;
	};
}

User.virtual('fullName').get(
	function () {
		return this.firstName + ' ' + this.lastName;
	}
);

User.loadClass(UserMethods);

module.exports = mongoose.model('User', User);
