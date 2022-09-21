const Cards = require('../models/card');
const {NotFoundError} = require('../errors/Errors');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;
  Cards.create({name, link, owner})
    .then(cards => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы не корректные данные'});
      } else {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId).orFail(new NotFoundError())
    .then(cards => res.send(cards))
    .catch((err) => {
      if(err.name === 'NotFound') {
        res.status(404).send({message: 'Карточка с указанным _id не найдена.'});
      } else if (err.name === 'CastError') {
        res.status(400).send({message: 'Введены не корректные данные'});
      } else {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
};

module.exports.likeCard  = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    ).orFail(new NotFoundError())
    .then(cards => res.send(cards))
    .catch((err) => {
      if(err.name === 'NotFound') {
        res.status(404).send({message: 'Карточка с указанным _id не найдена.'});
      } else if (err.name === 'CastError') {
        res.status(400).send({message: 'Введены не корректные данные'});
      } else {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
};

module.exports.dislikeCard  = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
    ).orFail(new NotFoundError())
    .then(cards => res.send(cards))
    .catch((err) => {
      if(err.name === 'NotFound') {
        res.status(404).send({message: 'Карточка с указанным _id не найдена.'});
      } else if (err.name === 'CastError') {
        res.status(400).send({message: 'Введены не корректные данные'});
      } else {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
};