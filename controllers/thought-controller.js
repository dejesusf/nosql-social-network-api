const { Thought, User } = require('../models');

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single thought by _id
  getSingleThought(req, res) {
    Thought.findOne(
      { _id: req.params.thoughtId }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({message: 'There is no thought with that ID'})
          : res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // POST a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          {
            username: req.body.username
          },
          {
            $addToSet: {
              thoughts: thought.id
            }
          }
        ).then((user) => {
          if (user) {
            return res.status(200).json(`${username}'s thought has been created.`)
          }
          return res.status(404).json('Thought formed but user was not found')  
        })
      })
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update thought by _id
  updateThought(req, res) {
    Thought.findOneAndUpdate (
      {
        _id: req.params.thoughtId
      },
      {
        $set: req.body
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({message: 'There is no user with this ID!'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
  },
  // DELETE to remove a thought by _id
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      {
        _id: req.params.ThoughtId
      },
    ).then(() => res.json({message: 'Thought has been deleted.'}))
    .catch((err) => res.status(500).json(err))
  },
  // POST create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId
      },
      {
        $addToSet: {
          reactions: req.body
        }
      },
      {
        runValidators: true,
        new: true,
      }
    ).then((reaction) =>
      !reaction
        ? res.status(404).json({message: 'There is no thought with this ID!'})
        : res.json(reaction)
    )
    .catch((err) => res.status(500).json(err))
  },
  // DELETE to remove a reaction by reactionIds
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId
      },
      {
        $pull: {
          reactions: {
            _id: req.body.reactionId
          }
        }
      },
      {
        runValidators: true,
        new: true,
      }
    ).then((reaction) =>
    !reaction
      ? res.status(404).json({message: 'There is no thought with this ID!'})
      : res.json(reaction)
  )
  .catch((err) => res.status(500).json(err))
  }
};