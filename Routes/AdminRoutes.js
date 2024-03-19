const express = require('express')
const AdminRoute = express.Router()
const { getAdmin, getProduct } = require("../helpers/helperFunctions")
const AdminModel = require('../models/Admin.js')
const ProductModel = require('../models/Products')
const ReportModel = require('../models/Reports')


//Admin login route
AdminRoute.get('/signin', getAdmin, async(req, res) => {
	try {
		jwt.sign(res.Admin, process.env.SECRET, {}, (err, token) => {
			if (err) {
				return res.status(400).json({ message: err.message })
			}

			res.cookie('token', token).json(res.Admin)
		})
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})


//Create new Admin route
AdminRoute.post('/create-admin', async(req, res) => {
	const { token } = req.cookies;
	const { name, email } = req.body

	if (!token) {
		return res.status(404).json({ message: "Sign in again" })
	}

	const info = await jwt.verify(token, process.env.SECRET)

	const { id } = info

	try {
		const adminExist = AdminModel.findOne({_id: id})

		if (!adminExist) {
			return res.status(404).json({ message: "Admin not Found" })
		}

		const newAdmin = await AdminModel.create({
			name,
			email,
			//generate a 12 digit password with uuid
		})

		res.status(201).json({ newAdmin: newAdmin })



	} catch (err) {
		res.status(500).json({ message: err.message })
	}

})

//Endpoint to add a new product
AdminRoute.post('/add-product', async(req, res) => {
	const { product_name, product_category, product_brand, product_price, product_info } = req.body

	try {
		const newProduct = await ProductModel.create({
			product_name,
			product_category,
			product_brand,
			product_price,
			product_info,
			created_at: new Date()
		})

		res.status(201).json({ message: "New Product created" })

	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})


//Endpoint to edit a product
AdminRoute.patch('/edit-product/:id', getProduct, async(req, res) => {

})

//Endpoint to delete a product
AdminRoute.delete('/delete-product/:id', getProduct, async(req, res) => {
	try {
		await ProductModel.deleteOne({ _id: res.Product._id })
	} catch ( err ) {
		res.status(500).json({
			message: err.message
		})
	}
})

//Endpoint to get reports
AdminRoute.get('/reports', async(req, res) => {

})

module.exports = AdminRoute