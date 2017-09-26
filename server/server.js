const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const jwt = require('jwt-simple')
const moment = require('moment')
const mongoose = require('mongoose')
const path = require('path')
const request = require('request')
const config = require('./config')

const User = mongoose.model('User', new mongoose.Schema({
	instagramId: { type: String, index: true },
	email: { type: String, unique: true, lowercase: true },
	password: { type: String, select: false },
	username: String,
	fullName: String,
	picture: String,
	accessToken: String
}))

mongoose.connect(config.db)

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

function createToken(user) {
	const payload = {
		exp: moment().add(14, 'days').unix(),
		iat: moment().unix(),
		sub: user._id
	}
	
	return jwt.encode(payload, config.tokenSecret)
}

function isAuthenticated(req, res, next) {
	if (!(req.headers && req.headers.authorization)) {
		return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' })
	}

	const header = req.headers.authorization.split(' ')
	const token = header[1]
	const payload = jwt.decode(token, config.tokenSecret)
	const now = moment().unix()

	if (now > payload.exp) return res.status(401).send({ message: 'Token has expired.' })

	User.findById(payload.sub, function(err, user) {
		if (!user) return res.status(400).send({ message: 'User no longer exists.' })
		req.user = user
		next()
	})
}

app.post('/auth/login', function(req, res) {
	User.findOne({ email: req.body.email }, '+password', function(err, user) {
		if (!user) return res.status(401).send({ message: { email: 'Incorrect email.' } })

		bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
			if (!isMatch) return res.status(401).send({ message: { password: 'Incorrect password' } })

			user = user.toObject()
			delete user.password

			const token = createToken(user)
			res.send({ token: token, user: user })
		})
	})
})

app.post('/auth/signup', function(req, res) {
	User.findOne({ email: req.body.email }, function(err, existingUser) {
		if (existingUser) return res.status(409).send({ message: 'Email is already taken.' })

		const user = new User({
			email: req.body.email,
			password: req.body.password
		})

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				user.password = hash

				user.save(function() {
					const token = createToken(user)
					res.send({ token: token, user: user })
				})
			})
		})
	})
})

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})