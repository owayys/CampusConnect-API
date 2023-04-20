const { sendRequest, acceptRequest, rejectRequest, friendsGetAll, getRequests } = require('../controllers/friends')

const router = require('express').Router()

router.post('/get', friendsGetAll)
router.post('/request/get', getRequests)
router.post('/request/send', sendRequest)
router.post('/request/accept', acceptRequest)
router.post('/request/reject', rejectRequest)

module.exports = router