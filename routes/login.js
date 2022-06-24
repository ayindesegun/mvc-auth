const express = require('express')
const {
  loginView,
  registerView,
  registerUser,
  loginUser,
} = require('../controllers/loginController.js')

const { protectRoute } = require('../auth/protect')
const { dashboardView } = require('../controllers/dashboardController')
const router = express.Router()

router.get('/register', registerView)
router.get('/login', loginView)
router.get('/dashboard', protectRoute, dashboardView)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
