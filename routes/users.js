const user = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatarUser, getUserMe,
} = require('../controllers/users');

user.get('/users', getUsers);
user.get('/users/me', getUserMe);
user.get('/users/:id', getUserById);
user.patch('/users/me', updateUser);
user.patch('/users/me/avatar', updateAvatarUser);

module.exports = user;
