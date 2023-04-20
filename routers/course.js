const { courseGetAll, scheduleGetAll, postEnrolled, getEnrolled } = require('../controllers/course')

const router = require('express').Router()

router.get('/getAll', courseGetAll)
router.get('/getSched', scheduleGetAll)
router.post('/enrolled/post', postEnrolled)
router.post('/enrolled/get', getEnrolled)

module.exports = router