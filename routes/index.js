const express = require('express')
const router = express.Router()
require('dotenv').config()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/secret', function (req, res, next) {
  res.send(process.env.SECRET)
})

module.exports = router
