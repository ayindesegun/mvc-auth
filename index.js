const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 5000
const dotenv = require('dotenv')
const session = require('express-session')
const passport = require('passport')
const { loginCheck } = require('./auth/passport.js')
loginCheck(passport)
dotenv.config()
const app = express()

app.set('view engine', 'ejs')
//const router = require('./routes/login.js')

app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: 'oneboy',
    saveUninitialized: true,
    resave: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

/* app.use(bodyParser.urlencoded({ extended: false })) */
const database = process.env.MONGO_URI
mongoose
  .connect(database)
  .then(() => console.log('e don connect'))
  .catch((err) => console.log(err))

app.use('/', require('./routes/login'))

app.listen(port, () => {
  console.log(`This server is alive and jiggy on port ${port}`)
})
