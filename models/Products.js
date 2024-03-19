const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
	product_name: {
		type: String,
		required: true
	},

	product_category: {
		type: String,
		required: true
	},

	product_brand: {
		type: String,
		required: true
	},

	product_price: {
		type: Number
	},

	product_info : {
		type: String
	},

	created_at : {
		type: Date
	}
})

const ProductModel = mongoose.model('ProductModel', ProductSchema)

module.exports = ProductModel