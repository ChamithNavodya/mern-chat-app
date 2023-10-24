const router = require("express").Router();
const auth = require('../middleware/auth')
const messageCtrl = require('../controllers/messageCtrl')

router.route('/')
  .get(auth, messageCtrl.getMessages)
  .post(auth, messageCtrl.createMessage)

router.route('/:id')
  .get(auth, messageCtrl.getMessage)
  .put(auth, messageCtrl.updateMessage)
  .delete(auth, messageCtrl.deleteMessage)

module.exports = router