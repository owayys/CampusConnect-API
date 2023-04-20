const { studentsGetAll } = require('../controllers/students')

const router = require('express').Router()

router.post('/get', studentsGetAll)

module.exports = router