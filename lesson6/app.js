const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const { userRouter, authRouter } = require('./routes');
const { constants } = require('./constans');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundhandler);
app.use(_handleErrors);

app.listen(constants.PORT, () => {
  console.log(`App listen ${constants.PORT}`);
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
  mongoose.connect(constants.BD_CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}
