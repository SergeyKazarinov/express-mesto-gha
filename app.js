const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { notFoundController } = require('./errors/notFoundController');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const err = require('./middlewares/error');
const { loginUserValidation, createUserValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', loginUserValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', notFoundController);
app.use(errors());
app.use(err);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
