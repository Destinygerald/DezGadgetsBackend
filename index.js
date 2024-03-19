const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD
const uuid = require("uuid");
=======
const app = express();
const server = require('http').createServer(app)
const { findSession, saveSession } = require('./helpers/SessionStorage.js');

const io = require('socket.io')(server, { cors: { origin: "*", credentials: true } });

>>>>>>> 4528a409dec27342388069af426c032256fdf173
require('dotenv').config();

const UserRoute = require('./Routes/UserRoutes') 
const AdminRoute = require('./Routes/AdminRoutes')

const app = express();

app.use(cors({
	origin: "*",
	credentials: true
}))

app.use('/user', UserRoute)
app.use('/admin', AdminRoute)

mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection

db.on('error', (err) => {
	console.log(`Error occurred ${err}`)
})

db.once('open', () => {
	console.log('Database connected')
})

app.listen(3000, () => {
	console.log("Listening to port 3000")
})