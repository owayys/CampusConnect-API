const { studentsGetAll } = require('../controllers/students')

const router = require('express').Router()

router.get('/get', studentsGetAll)

module.exports = router