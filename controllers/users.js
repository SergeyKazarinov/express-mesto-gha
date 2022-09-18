const Users = require('../models/user');


module.exports.getUsers = (req, res) => {
  Users.find({})
    .then(user => res.send(user))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id)
  .then(user => res.send(user))
  .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.createUser = (req, res) => {
  const data = req.body;
  Users.create(data)
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUser = (req, res) => {
  Users.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
    new: true,
    runValidators: true,
    upsert: true
    }
  )
  .then(user => res.send(user))
  .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.updateAvatarUser = (req, res) => {
  Users.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
    new: true,
    runValidators: true,
    upsert: true
    }
  )
  .then(user => res.send(user))
  .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};