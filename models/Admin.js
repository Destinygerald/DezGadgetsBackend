const mongoose = require('mongoose')
const { Schema } = mongoose

const AdminSchema = new Schema({
	name : {
		type: String,
		unique: true
	},

	email: {
		type: String,
		lowercase: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	id: {
		type: String,
		unique: true
	}
})

const AdminModel = mongoose.model('AdminModel', AdminSchema)

module.exports = AdminModel