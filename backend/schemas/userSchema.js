const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');


const User = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	password: {
		type: String
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
	bcrypt.genSalt(1012, (err, salt) => {
		userData.salt = salt;
		this.encryptPassword(this.password, (err, hash) => {
			if (err) return next(err);

			userData.password = hash;
			next();
		})
	});
});

User.pre('update', function (next) {
	const fields = this._update.$set;

	if (!fields || !fields.password) return next();

	bcrypt.genSalt(1012, (err, salt) => {
		fields.salt = salt;
		bcrypt.hash(fields.password, fields.salt, null, (err, hash) => {
			if (err) return next(err);

			fields.password = hash;
			next();
		});
	});
});

User.methods.checkPassword = function (password) {
	return new Promise((resolve, reject) => {
		this.encryptPassword(password)
			.then(hash => {
				resolve(hash === this.password)
            })
            .catch(err => {
                reject(err);
            })
	})
};

User.methods.encryptPassword = function (password, callback) {
	return bcrypt.hash(password, this.salt);
};

User.methods.checkToken = function (token) {
	return this.activateToken === token;
};

User.virtual('fullName').get(
	function () {
		return this.firstName + ' ' + this.lastName;
	}
);

module.exports = mongoose.model('User', User);
