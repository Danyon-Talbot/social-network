const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

// GET all thoughts
router.get('/thoughts', thoughtController.getThoughts);

// GET single thought by _id
router.get('/thoughts/:thoughtId', thoughtController.getSingleThought);

// POST to create a new thought and push thought _id to the associated user's thoughts array field
router.post('/thoughts', thoughtController.createThought);

// PUT to update thought by _id
router.put('/thoughts/:thoughtId', thoughtController.updateThought);

// DELETE to delete thought by _id
router.delete('/thoughts/:thoughtId', thoughtController.deleteThought);

module.exports = router;
