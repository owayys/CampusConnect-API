const { groupGetAll, groupCreate, groupJoin, groupGet } = require('../controllers/group')

const router = require('express').Router()

router.post('/get', groupGet)
router.post('/getAll', groupGetAll)
router.post('/create', groupCreate)
router.post('/join', groupJoin)

module.exports = router