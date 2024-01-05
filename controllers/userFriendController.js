const User = require('../models/User');

module.exports = {
  // POST a friend to a User's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'Friend added!' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // DELETE a friend from a User's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'Friend removed!' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};
