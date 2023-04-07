const { chatroomGetAll, chatroomCreate, getMessages, sendMessage } = require('../controllers/chatroom')

const router = require('express').Router()

router.get('/get', chatroomGetAll)
router.post('/create', chatroomCreate)
router.get('/message/get', getMessages)
router.post('/message/send', sendMessage)

module.exports = router