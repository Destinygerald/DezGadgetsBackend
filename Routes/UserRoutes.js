const express = require('express')
const UserRoute = express.Router()
const UserModel = require('../models/User.js')
const jwt = require('jsonwebtoken')
const { getUser } = require("../helpers/helperFunctions")
const ReportModel = require('../models/Reports')

require('dotenv').config();

//Create new user
UserRoute.post('/signup', async(req, res) => {

	const { name, email, password } = req.body;

	try {
		const userExist = await UserModel.find()

		if ( userExist ) {
			return res.status(400).json({ message: "User already exists" })
		}

		UserModel.create({
			name,
			email,
			password
		})

	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

//Login Route
UserRoute.get('/signin', getUser, async(req, res) => {
	try {
		jwt.sign(res.User, process.env.SECRET, {}, (err, token) => {
			if (err) {
				return res.status(400).json({ message: err.message })
			}

			res.cookie('token', token).json(res.User)
		})
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

//Endpoint to make a report
UserRoute.post('/report', async(req, res) => {
	
})

module.exports = UserRoute