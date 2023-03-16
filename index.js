const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('./utils/errorLogger')

const app = express()
app.use(cors())
app.use(express.json())
app.options('*', cors())

const User = require('./users/user.routes')
app.use('/api/v1', User)

app.listen(3000, () => console.log("Se ha conectado el servidor"))
console.log(process.env.DB)
mongoose.connect(process.env.DB)
    .then(() => console.log("Se ha conectado la base de datos"))
    .catch(() => logger.error("No se conecto a la bd"))