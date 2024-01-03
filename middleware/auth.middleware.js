const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      const errorUnAuthorized = new Error("token should be in header!", 401)
      next(errorUnAuthorized)
    }
    const token = authorization.split(" ")[1]
    const verified = jwt.verify(token, process.env.SECRET_KEY)

    if (!verified) {
      const errorInValid = new Error("token is not valid!", 403)
      next(errorInValid)
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication
