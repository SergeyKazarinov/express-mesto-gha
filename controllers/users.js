const Users = require('../models/user');
const {NotFoundError} = require('../errors/Errors');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then(user => res.send(user))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id).orFail(new NotFoundError())
  .then(user => res.send(user))
  .catch((err) => {
    console.log(`Ошибка: ${err.name}`);
    if(err.name === 'NotFound') {
      res.status(404).send({message: 'Пользователь с указанным id не найден.'});
    } else if(err.name === 'CastError') {
      res.status(400).send({message: 'Введены не корректные данные'});
    } else {
      res.status(500).send({message: 'Произошла ошибка'});
    }
  });
};

module.exports.createUser = (req, res) => {
  const data = req.body;
  Users.create(data)
    .then(user => res.send({data: user}))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы не корректные данные'});
      } else {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
};

module.exports.updateUser = (req, res) => {
  const {name, about} = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {name, about},
    {
    new: true,
    runValidators: true,
    upsert: false
    }
  ).orFail(new NotFoundError())
  .then(user => res.send(user))
  .catch((err) => {
    if(err.name === 'ValidationError') {
      res.status(400).send({message: 'Введены не корректные данные'});
    } else if (err.name === 'CastError') {
      res.status(404).send({message: 'Пользователь с указанным id не найден'});
    } else {
      res.status(500).send({message: 'Произошла ошибка'});
    }
  });
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;

  Users.findByIdAndUpdate(
    req.user._id,
    {avatar},
    {
    new: true,
    runValidators: true
    }
  ).orFail(new NotFoundError())
  .then(user => res.send(user))
  .catch((err) => {
    if(err.name === 'ValidationError') {
      res.status(400).send({message: 'Введены не корректные данные'});
    } else if (err.name === 'CastError') {
      res.status(404).send({message: 'Пользователь с указанным id не найден'});
    } else {
      res.status(500).send({message: 'Произошла ошибка'});
    }
  });
};