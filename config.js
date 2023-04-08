require('dotenv').config()

const ENV = process.env.NODE_ENV

const TOKEN =
  process.env.NODE_ENV === 'developement'
    ? process.env.TEST_TOKEN
    : process.env.TOKEN

const CLIENT_ID =
  process.env.NODE_ENV === 'developement'
    ? process.env.test_CLIENT_ID
    : process.env.CLIENT_ID

const PORT = process.env.PORT || 8080

module.exports = {
  ENV,
  TOKEN,
  CLIENT_ID,
  PORT,
}
