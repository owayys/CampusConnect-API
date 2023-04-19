const { interestsGet, addInterest, removeInterest } = require('../controllers/interests')

const router = require('express').Router()

router.post('/get', interestsGet)
router.post('/add', addInterest)
router.post('/remove', removeInterest)


module.exports = router