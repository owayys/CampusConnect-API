const { eventsOngoing } = require('../controllers/event')

const router = require('express').Router()

router.get('/ongoing', eventsOngoing)
// router.get('/upcoming', eventsUpcoming)
// router.get('/completed', eventsCompleted)
// router.post('/create', eventsCreate)
// router.post('/edit', eventsEdit)
// router.post('/delete', eventsDelete)

module.exports = router