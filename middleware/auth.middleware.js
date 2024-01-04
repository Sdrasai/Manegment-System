const jwt = require("jsonwebtoken")
const { employee } = require("../db")
const db = require("../db")

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      new Error("token should be in header!", 401)
    }
    const token = authorization.split(" ")[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY)

    if (payload) {
      const email = payload.email
      const user = await db.employee.findUnique({ where: { email } })
      req.user = user
      if (user.roles === "superadmin") next()
      else throw new Error("not Authorized")
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = authentication
