const { groupGetAll, groupCreate } = require('../controllers/group')

const router = require('express').Router()

router.post('/getAll', groupGetAll)
router.post('/create', groupCreate)

module.exports = router