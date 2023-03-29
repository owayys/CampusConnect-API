const { eventOngoing, eventUpcoming, eventCompleted, eventGet, eventCreate, eventEdit, eventDelete } = require('../controllers/event')

const router = require('express').Router()

router.get('/ongoing', eventOngoing)
router.get('/upcoming', eventUpcoming)
router.get('/completed', eventCompleted)
router.get('/get', eventGet)
router.post('/create', eventCreate)
router.post('/edit', eventEdit)
router.post('/delete', eventDelete)

module.exports = router