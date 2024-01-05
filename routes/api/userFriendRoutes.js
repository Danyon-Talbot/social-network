const express = require('express');
const router = express.Router();
const {
    addFriend,
    removeFriend
} = require('../../controllers/userFriendController');

console.log('userFriendRoutes Initialised')

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;