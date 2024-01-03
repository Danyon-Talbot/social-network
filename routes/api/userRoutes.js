const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// GETs all Users
router.get('/users', userController.getUsers);

// GETs one User by ID
router.get('./users/:userId', userController.getSingleUser);

// POST new User
router.get('./users', userController.createUser);

// Update User by ID
router.get('./users/:userId', userController.updateUser);

// Delete User by ID
router.get('./users/:userId)', userController.deleteUser);

module.exports = router;