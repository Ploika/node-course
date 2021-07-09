const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { userRouter, authRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundhandler);
app.use(_handleErrors);

app.listen(3000, () => {
  console.log('local host 3000');
});

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      customCode: err.customCode || 0,
      message: err.message || 'Unknown error'
    });
}

function _notFoundhandler(req, res, next) {
  next({
    status: 404,
    message: 'Rout not found'
  });
}

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/feb-2021', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}
