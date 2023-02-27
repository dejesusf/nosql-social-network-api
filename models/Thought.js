const {Schema, model} = require('mongoose');

// subdocument
const reactionSchema = new Schema (
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: getter method to format the timestamp
    }
  },
  {
    toJSON: {
      getters: true,
    }
  }
)

// parent document
const thoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: getter method to format the timestamp
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// reactionCount virtual property
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;