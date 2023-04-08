require('dotenv').config()

const token =
  process.env.NODE_ENV === 'developement'
    ? process.env.test_token
    : process.env.token
const clientId =
  process.env.NODE_ENV === 'developement'
    ? process.env.test_CLIENT_ID
    : process.env.clientId

const guildId = process.env.guildId

module.exports = {
  token,
  clientId,
  guildId,
}
