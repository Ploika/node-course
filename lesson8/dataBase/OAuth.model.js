const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constans');

const OAuthSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: dataBaseTablesEnum.USER
  },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OAuthSchema.pre('find', function() {
  this.populate('user');
});
OAuthSchema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(dataBaseTablesEnum.O_Auth, OAuthSchema);
