const { Thought, User } = require('../models');


const thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({});
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  // get one thought by id
  async getThoughtById({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: params.id });

      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  // createThought
async createThought({ body }, res) {
  try {
    const dbThoughtData = await Thought.create(body);
    // after creating the thought, we push the _id of the thought to the thoughts array of the user
    const dbUserData = await User.findByIdAndUpdate(
      body.userId,
      { $push: { thoughts: dbThoughtData._id } },
      { new: true }
    );
    res.json(dbThoughtData);
  } catch (err) {
    res.status(400).send(err);
  }
},

  // update thought by id
  async updateThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });

      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // delete thought
async deleteThought({ params }, res) {
  try {
    const dbThoughtData = await Thought.findOneAndDelete({ _id: params.id });
    // after deleting the thought, we pull the _id of the thought from the thoughts array of the user
    if (dbThoughtData) {
      const dbUserData = await User.updateOne(
        { thoughts: params.id },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
    }
    res.json(dbThoughtData);
  } catch (err) {
    res.status(400).send(err);
  }
},

  // add reaction
  async addReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      );

      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // remove reaction
  async removeReaction({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

module.exports = thoughtController;

