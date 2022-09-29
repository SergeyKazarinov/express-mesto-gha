const Cards = require('../models/card');
const IncorrectData = require('../errors/IncorrectData');
const {
  INCORRECT_DATA_MESSAGE,
  NOT_FOUND_CARD_ID_MESSAGE,
  NOT_RIGHTS_MESSAGE,
} = require('../utils/constants');
const NotFoundCardId = require('../errors/NotFoundCardId');
const NotRightError = require('../errors/NotRightError');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId).orFail(new NotFoundCardId(NOT_FOUND_CARD_ID_MESSAGE))
    .then((card) => {
      const user = String(req.user._id);
      const cardOwner = String(card.owner);
      if (user === cardOwner) {
        Cards.findByIdAndRemove(req.params.cardId)
          .then((deletedCard) => {
            Cards.find({ _id: deletedCard._id })
              .then((cards) => {
                console.log(cards);
                if (!cards.length > 0) {
                  res.send(deletedCard);
                } else {
                  throw new Error();
                }
              });
          });
      } else {
        next(new NotRightError(NOT_RIGHTS_MESSAGE));
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundCardId') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundCardId(NOT_FOUND_CARD_ID_MESSAGE))
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'NotFoundCardId') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundCardId(NOT_FOUND_CARD_ID_MESSAGE))
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'NotFoundCardId') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};
