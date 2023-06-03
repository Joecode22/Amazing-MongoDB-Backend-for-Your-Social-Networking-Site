const { User } = require('../models');

const userController = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const dbUserData = await User.find({});
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  // get one user by id
  async getUserById({ params }, res) {
    try {
      const dbUserData = await User.findOne({ _id: params.id });

      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  // createUser
  async createUser({ body }, res) {
    try {
      const dbUserData = await User.create(body);
      res.json(dbUserData);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // update user by id
  async updateUser({ params, body }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });

      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // delete user
  async deleteUser({ params }, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: params.id });
      res.json(dbUserData);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // add friend
  async addFriend({ params }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // remove friend
  async removeFriend({ params }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      res.json(dbUserData);
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

module.exports = userController;
