const express = require('express')

const app = express()

app.use(express.static(__dirname + '/client'))
app.use(express.static(__dirname))

app.listen(8000)

console.log('Server running on http://localhost:8000')