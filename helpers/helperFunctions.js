const UserModel = require('../models/User.js')
const AdminModel = require('../models/Admin.js')
const ProductModel = require('../models/Products.js')

const CATERGORIES = []

//Middleware function to comfirm a users existence
async function getUser(req, res, next) {
	
	try {
		const User = await UserModel.find(req.body.name)

		if ( !User ) {
			return res.status(400).json({ message: "User not found" })
		}

		res.User = User
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
	
	next()
}

//Middleware function to confirm an Admin existence
async function getAdmin(req, res, next) {
	
	try {
		const Admin = await AdminModel.find(req.body.name)

		if ( !Admin ) {
			return res.status(400).json({ message: "Admin not found" })
		}

		res.Admin = Admin
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
	
	next()
}

//Middleware to find if a product exists
async function getProduct(req, res, next) {

	try {
		//Check if it is param or params?????
		const Product = await ProductModel.find(req.params.id)

		if (!Product) {
			return res.status(400).json({ message: "Product not found" })
		}

		res.Product = Product
	} catch (err) {
		res.status(500).json({ message: err.message })
	}

	next()
}

module.exports = { getUser, getAdmin, getProduct }