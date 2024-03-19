const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	
	email: {
		type: String,
		lowercase: true,
		unique: true
	},

	password: { 
		type: String
	},

	id: {
		type: String,
		unique: true
	}
})

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;