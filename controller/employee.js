const db = require("../db")
const { createToken } = require("../utils")

module.exports = {
  // register: async (req, res, next) => {
  //   try {
  //     const { email, name } = req.body

  //     const employee = await db.employee.create({
  //       data: { name, email },
  //     })
  //     return res
  //       .json({
  //         message: `employee ${employee.name} registerd`,
  //         employeeId: employee.id,
  //       })
  //       .status(201)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  createEmployee: async (req, res) => {
    try {
      const { name, email } = req.body
      const employee = await db.employee.create({
        data: {
          name,
          email,
        },
      })
      res
        .json({
          message: "New employee successfully created!",
          status: 201,
          employee: employee,
        })

        .status(201)
    } catch (error) {
      // console.log("Employee Login Error: ", error)
      // res.json({ message: "Internal Server Error" }).status(500)
      console.log(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { name, email } = req.body
      const employee = await db.employee.findFirst({ where: { email } })
      if (!employee) {
        throw new Error("name or email is not correct!")
      }
      const token = await createToken(
        { name, email },
        process.env.SECRET_KEY,
        process.env.ACCESS_TOKEN_TIME,
        process.env.REFRESH_TOKEN_TIME
      )
      return res.json({ token })
    } catch (error) {
      console.log("Employee Login Error: ", error)
      res.json({ message: "Internal Server Error" }).status(500)
    }
  },
  employeeList: async (req, res) => {
    try {
      const employees = await db.employee.findMany({
        select: { id: true, name: true, email: true },
      })
      res.status(200).json(employees)
    } catch (error) {
      // console.error("employee List Error:", error)
      // res.status(500).json({ error: "Internal Server Error" })
      console.log(error)
    }
  },
}
