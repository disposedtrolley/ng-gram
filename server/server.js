const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const jwt = require('jwt-simple')
const moment = require('moment')
const mongoose = require('mongoose')
const path = require('path')
const request = require('request')

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})