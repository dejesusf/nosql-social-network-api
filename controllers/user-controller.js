const { Schema, model } = require('mongoose');
const { Thought, User } = require('../models');

// /api/users
module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({
      _id: req.params.userId
    })
      .then((user) =>
        !user
          ? res.status(404).json({message: 'There is no user with that ID'})
          : res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // TODO: POST a new user
};



// TODO: PUT update user by _id

// TODO: DELETE user by _id

// TODO: BONUS: remove a user's associated thought when deleted


// api/users/:userId/friends/:friendId
// TODO: POST to add a new friend to friend's list

// TODO: DELETE to remove a friend from friend's list