const { Thought, User } = require('../models');

module.exports = {
  // GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // GET single thought by _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // POST to create a new thought and push thought _id to the associated user's thoughts array field
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // Update the associated user's thoughts array
      await User.findByIdAndUpdate(
        thought.username,
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // PUT to update thought by _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // DELETE to delete thought by _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Remove the thought _id from the associated user's thoughts array
      await User.findByIdAndUpdate(
        thought.username,
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};
