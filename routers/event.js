const { eventGet, eventCreate, eventEdit, eventDelete, eventGetAll } = require('../controllers/event')

const router = require('express').Router()

router.get('/getAll', eventGetAll)
router.get('/get', eventGet)
router.post('/create', eventCreate)
router.post('/edit', eventEdit)
router.post('/delete', eventDelete)

module.exports = router