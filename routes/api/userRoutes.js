const express = require('express');
const router = express.Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser
} = require('../../controllers/userController');

console.log('User routes initialised');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

module.exports = router;