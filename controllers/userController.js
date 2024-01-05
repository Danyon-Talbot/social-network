const User = require('../models/User');
const mongoose = require('mongoose');


module.exports = {
    // GETs all Users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    },

    // GETS one user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Creates new User
    async createUser(req, res) {
        try {
          const { username, email } = req.body;
          const user = await User.create({ username, email });
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // Updates User by ID
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });

            if (!user) {
                return res.status(404).json({ message: "No user found with that ID"})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Deletes User by ID
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: "No user found with that ID"})
            }

            res.json({ message: "User Deletion Successful"})
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    async addFriend(req, res) {
        try {
          // Capture userId and friendId from route parameters
          const userId = req.params.userId;
          const friendId = req.params.friendId;
      
          // Check if userId and friendId are valid MongoDB ObjectIDs
          if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ error: 'Invalid ObjectIDs' });
          }
      
          // Find the user with userId and add friendId to their friends array
          const user = await User.findOneAndUpdate(
            { _id: userId }, // No need to cast as ObjectId here
            { $addToSet: { friends: friendId } }, // No need to cast as ObjectId here
            { new: true }
          );
      
          // Handle the case where the user with userId is not found
          if (!user) {
            return res.status(404).json({ message: `User with ID ${userId} not found` });
          }
      
          // Send a success response
          res.json({ message: 'Friend added!' });
        } catch (err) {
          // Handle server errors gracefully
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
    
}