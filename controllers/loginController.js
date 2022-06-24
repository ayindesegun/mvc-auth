const User = require('../model/user.js')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const registerView = (req, res) => {
  res.render('register', {})
}

// POST request to register users
const registerUser = (req, res) => {
  const { name, email, password, confirm } = req.body
  if (!name || !email || !password || !confirm) {
    console.log('Please fill the input fields')
  }
  // to confirm password
  if (password !== confirm) {
    console.log('Password not a match')
  } else {
    //validation
    User.findOne({ email }).then((user) => {
      if (user) {
        console.log('E-mail found')
        res.render('register', {
          name,
          email,
          password,
          confirm,
        })
      } else {
        //validation
        const newUser = new User({
          name,
          email,
          password,
          confirm,
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
            console.log(err)
          }
          newUser.password = hash
          newUser
            .save()
            .then(res.redirect('/login'))
            .catch((err) => console.log(err))
          })
        })
        }
      });
    }
  };
const loginView = (req, res) => {
  res.render('login', {})
}
// POST request to the login route and Validation for login
const loginUser = (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email) {
    console.log('Please fill empty fields')
    res.render('login', { email, password })
  } else {
    passport.authenticate('local', {
      successRedirect : '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res)
}
}

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
}
