const jwt = require("jsonwebtoken")
const { user } = require("../db")
const db = require("../db")

module.exports = async function createToken(
  payload,
  secretKey,
  accessExpire,
  refreshExpire,
  email = null,
  name
) {
  try {
    const accessToken = jwt.sign(payload, secretKey, {
      expiresIn: accessExpire,
    })
    const refreshToken = jwt.sign(payload, secretKey, {
      expiresIn: refreshExpire,
    })

    if (email) {
      const employee = await db.employee.findUnique({ where: { email } })

      if (employee) {
        await db.token.create({
          data: {
            employee: name,
            token: refreshToken,
            employee: {
              connect: {
                name: employee.name,
              },
            },
          },
        })
      }
    }

    return { refreshToken, accessToken }
  } catch (error) {
    throw new Error(error.message)
  }
}
