// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'NodeJs Exercise' });
// });
const express = require("express")

const employeeRoute = require("./employee.route")

const router = express.Router()

router.use("/employee", employeeRoute)

module.exports = router
