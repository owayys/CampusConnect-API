const { chatroomGetAll, chatroomCreate, chatroomMemberAdd, chatroomMemberRemove, getMessages, sendMessage } = require('../controllers/chatroom')

const router = require('express').Router()

router.post('/get', chatroomGetAll)
router.post('/create', chatroomCreate)
router.post('/member/add', chatroomMemberAdd)
router.post('/member/remove', chatroomMemberRemove)
router.get('/message/get', getMessages)
router.post('/message/send', sendMessage)

module.exports = router