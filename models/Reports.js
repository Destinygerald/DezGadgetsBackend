const mongoose = require('mongoose')
const { Schema } = mongoose

const ReportSchema = new Schema({
	sender_name: {
		type: String
	},

	sender_email: {
		type: String
	},

	message: {
		type: String
	},

	date_sent: {
		type: Date
	}
})

const ReportModel = mongoose.model("ReportModel", ReportSchema)

module.exports = ReportModel