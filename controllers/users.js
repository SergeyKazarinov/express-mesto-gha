const Users = require('../models/user');


module.exports.getUsers = (req, res) => {
  Users.find({})
    .then(user => res.send(user))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.getUserById = (req, res) => {
  if(!Users[req.param.id]) {
    res.send('Такого пользователя не существуует');
    return;
  }

  const user = Users[req.param.id];
  res.send(user);
};

module.exports.createUser = (req, res) => {
  const data = req.body;
  Users.create(data)
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};