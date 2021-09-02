const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { constants } = require('../constans');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, constants.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
    const refreshToken = jwt.sign({}, constants.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken
    };
  },
  verifyToken: async (token, tokenType = 'access') => {
    const secretWord = tokenType === 'access' ? constants.ACCESS_TOKEN_SECRET : constants.REFRESH_TOKEN_SECRET;

    const verify = await verifyPromise(token, secretWord);
    console.log(verify);
  }
};
