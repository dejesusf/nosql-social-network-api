const { Thought, User } = require('../models');

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and populate thought and friend data
  getSingleUser(req, res) {
    User.findOne(
      { _id: req.params.userId }
    )
      .then((user) =>
        !user
          ? res.status(404).json({message: 'There is no user with that ID'})
          : res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // PUT update user by _id
  updateUser(req, res) {
    User.findOneAndUpdate (
      {
        _id: req.params.userId
      },
      {
        $set: req.body
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({message: 'There is no user with this ID!'})
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  },
  // DELETE user by _id
  // deleteUser(req, res) {
  //   User.findOneAndDelete(
  //     {
  //       _id: req.params.UserId
  //     },
  //   ).then(() => res.json({message: 'User has been deleted.'}))
  //   .catch((err) => res.status(500).json(err))
  // },
  // BONUS: remove a user's associated thought when deleted
  deleteUserAndThoughts(req, res) {
    User.findOneAndDelete(
      {
        _id: req.params.userId
      }
    ).then((user) =>
    !user
      ? res.status(404).json({message: 'There is no course with that ID!'})
      : Thought.deleteMany(
        {
          _id: {
            $in: user.thoughts
          }
        }
      )
    ).then(() => res.json({message: "User's associated thoughts have been deleted."}))
    .catch((err) => res.status(500).json(err));
  },
  // POST to add a new friend to friend's list
  addFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.body.userId
      },
      {
        $add: {
          friends: req.body.userId
        }
      },
      {
        runValidators: true,
        new: true,
      }
    ).then((users) => res.json(users))
    .catch((err) => res.status(500).json(err))
  },
  // DELETE to remove a friend from friend's list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId
      },
      {
        $pull: {
          friends: req.params.friendId
        }
      },
      {
        runValidators: true,
        new: true
      }
    ).then(() => res.json({message: 'Friend has been removed.'}))
    .catch((err) => res.status(500).json(err));
  }
};