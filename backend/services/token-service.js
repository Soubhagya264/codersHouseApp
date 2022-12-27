const jwt = require('jsonwebtoken');
const refresh_model = require('../models/refresh_model');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "2h"
    })

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: '2y'
    })
    return { accessToken, refreshToken }

  }
  
  async storeRefreshToken(token, userId) {
    try {
      await refresh_model.create({
        token,
        userId
      });
    } catch (e) { console.log(e) }
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN);
  }

  async verifyrefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
  }

  async findRefToken(userId, refreshToken) {
    const token = await refresh_model.findOne({
      userId: userId,
      token: refreshToken
    })
    return token;
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refresh_model.updateOne({
      userId: userId
    },
      { token: refreshToken }
    )
  }

  async removeToken(refreshToken) {
    await refresh_model.deleteOne({
      token: refreshToken
    })
  }

}

module.exports = new TokenService();