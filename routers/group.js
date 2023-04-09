const { groupGetAll, groupCreate } = require('../controllers/group')

const router = require('express').Router()

router.get('/get', groupGetAll)
router.post('/create', groupCreate)

module.exports = router