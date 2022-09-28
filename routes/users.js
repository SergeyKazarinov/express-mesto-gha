const user = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatarUser,
} = require('../controllers/users');

user.get('/users', getUsers);
user.get('/users/:id', getUserById);
user.patch('/users/me', updateUser);
user.patch('/users/me/avatar', updateAvatarUser);

module.exports = user;
