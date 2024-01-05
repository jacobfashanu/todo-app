const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      req.userId = data.id;
      next();
      // const user = await User.findById(data.id)
      // if (user) return res.json({ status: true, user: user.username, userData: user.pageData })
      // if (user) next();
      // else return res.json({ status: false })
    }
  });
}