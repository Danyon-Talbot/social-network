const userFriendController = require('../controllers/userFriendController');

const express = require('express');
const router = express.Router();

// POST new friend to User
router.post('/users/:userId/friends/:friendId', userFriendController.addFriend);

// DELETE friend from User
router.delete('/users/:userId/friends/:friendId', userFriendController.removeFriend);

module.exports = router;