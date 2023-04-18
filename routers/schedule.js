const { scheduleGetAll } = require('../controllers/schedule')

const router = require('express').Router()

router.get('/get', scheduleGetAll)

module.exports = router