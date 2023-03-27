const { userLogin, userSignup } = require('../controllers/auth')

const router = require('express').Router()

router.post('/login', userLogin)
router.post('/signup', userSignup)

module.exports = router