const Thought = require('../models/Thought');
const User = require('../models/User');

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
      const { thoughtText, username, userId } = req.body;
  
      if (!thoughtText || !username || !userId) {
        return res.status(400).json({ error: 'Invalid request data. Make sure you provide thoughtText, username, and userId.' });
      }
  
      // Create a new thought with userId
      const thought = await Thought.create({ thoughtText, username, userId });
  
      if (!thought) {
        return res.status(500).json({ error: 'Failed to create thought' });
      }
  
      // Update the associated user's thoughts array
      const updatedUser = await User.findOneAndUpdate(
        { username, _id: userId }, // Ensure you are using _id for userId
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      if (!updatedUser) {
        console.error(`User not found: username=${username}, userId=${userId}`);
        return res.status(404).json({ error: 'User not found' });
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
      const { reactionBody, username, userId } = req.body;
  
      // Create a new reaction object
      const newReaction = {
        reactionBody,
        username,
      };
  
      // Find the thought by its thoughtId and push the new reaction
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: newReaction } },
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
  
      res.json(newReaction);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async deleteReaction(req, res) {
    try {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.params.reactionId;

        // Find the thought by its thoughtId and remove the reaction by its reactionId
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought or reaction with that ID' });
        }

        res.json({ message: 'Reaction deleted!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
  }

}