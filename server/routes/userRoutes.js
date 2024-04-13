const express = require('express')
const { model } = require('mongoose')
// const requireAuth = require('../middleware/requireAuth')

// controller functions
const { loginUser, registerUser, test } = require('../controllers/userController')

const router = express.Router()

// middleware require auth for all auths (for others routes not here)
// router.use(requireAuth)

// login route
router.post('/login', loginUser);  // Note: no () after loginUser

// registration route
router.post('/register', registerUser);  // Note: no () after registerUser

router.get('/test', test);  // Note: no () after test

module.exports = router
