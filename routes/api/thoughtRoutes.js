const express = require('express');
const router = express.Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

console.log('Thought routes initialised');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;
