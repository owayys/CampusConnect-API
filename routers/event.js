const { eventGet, eventCreate, eventEdit, eventDelete, eventGetAll, eventGoing } = require('../controllers/event')

const router = require('express').Router()

router.get('/getAll', eventGetAll)
router.get('/get', eventGet)
router.post('/create', eventCreate)
router.post('/edit', eventEdit)
router.post('/delete', eventDelete)
router.post('/going', eventGoing)

module.exports = router