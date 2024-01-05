const Thought = require('../models/Thought');
const User = require('../models/User');
const mongoose = require('mongoose');

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
      const { thoughtText, username } = req.body;
  
      if (!thoughtText || !username) {
        return res.status(400).json({ error: 'Invalid request data. Make sure you provide both thoughtText and username.' });
      }
  
      // Create a new thought
      const thought = await Thought.create({ thoughtText, username });
  
      if (!thought) {
        return res.status(500).json({ error: 'Failed to create thought' });
      }
  
      // Update the associated user's thoughts array
      const updatedUser = await User.findOneAndUpdate(
        { username }, // Use the username as a filter to find the user
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(500).json({ error: 'Failed to update user' });
      }
  
      res.json(thought);
    } catch (err) {
      console.error(err);
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
        await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

    async createReaction(req, res) {
        try {
        const { reactionBody, username } = req.body;
    
        // Create a new reaction
        const reaction = await Reaction.create({ reactionBody, username });
    
        // Find the thought by its thoughtId and push the reaction to its reactions array
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: reaction._id } },
            { new: true }
        );
    
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
    
        res.json(reaction);
        } catch (err) {
        res.status(500).json({ error: 'Server error' });
        }
    }
}