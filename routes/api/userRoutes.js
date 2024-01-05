const express = require('express');
const router = express.Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// const {
//     addFriend,
//     removeFriend
// } = require('../../controllers/userFriendController')

console.log('User routes initialised');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;