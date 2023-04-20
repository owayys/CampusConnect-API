const { groupGetAll, groupCreate, groupJoin } = require('../controllers/group')

const router = require('express').Router()

router.get('/get', groupGetAll)
router.post('/create', groupCreate)
router.post('/join', groupJoin)

module.exports = router