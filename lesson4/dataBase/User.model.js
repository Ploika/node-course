const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum, userRolesEnum } = require('../constans');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  age: {
    type: Number,
    default: 15
  },

  role: {
    type: String,
    enum: Object.values(userRolesEnum),
    default: userRolesEnum.USER
  }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.USER, userSchema);
