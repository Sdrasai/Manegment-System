// var express = require('express');
// var router = express.Router();

const express = require("express")
const { employeeController } = require("../controller")
const { authentication } = require("../middleware")

const router = express.Router()

// router.post("/register", authentication, employeeController.register)
router.post(
  "/createEmployee",
  authentication,
  employeeController.createEmployee
)
router.post("/login", employeeController.login)
router.get("/employeeList", authentication, employeeController.employeeList)

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

// router.post('/createUser', (req, res, next) => {
//   /// Add Create User
//   res.send('not implemented')
// });

// router.get('/createUser', (req, res, next) => {
//   /// Add Create User
//   res.send('not implemented cause its Unnecessary ')
// });

// router.get('/getUsersDoneWork', (req, res, next) => {
//   /// Add Get User's doneWork
//   res.send('not implanted')
// });

module.exports = router
