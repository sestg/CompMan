var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')


var usr = new mongoose.Schema({
	email: {
		type: String, //TODO: make email datatype
		required: true
	},
	local: {
		password: {
			type: String,
		}
	},
	saml: {
		id: {
			type: String,
		}
	},
	name: String,
	surname: String,
	school: String,
	type: {
		type: String,
		default: 'user',
		enum: ['user', 'mod', 'admin']
	},
	lastIp: String
})

usr.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

usr.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', usr);
