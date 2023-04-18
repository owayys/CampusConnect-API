const { courseGetAll } = require('../controllers/course')

const router = require('express').Router()

router.get('/get', courseGetAll)

module.exports = router