const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { notFoundController } = require('./errors/notFoundController');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const err = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', notFoundController);
app.use(err);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
