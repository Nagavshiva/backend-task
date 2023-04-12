const User = require('../models/User');


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).send('Name and email are required');
      return;
    }
    const newUser = await User.create({ name, email });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).send('Name and email are required');
      return;
    }
    user.name = name;
    user.email = email;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.send('User deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
