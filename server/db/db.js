const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)


function getUsers (db = connection) {
  return db('users').select()
}

function addUser(user, db = connection) {
  return db('users')
  .insert(user)
}

function getUser(name, db=connection) {
  return db('users')
  .where("name", name)
  .first()
  .select()
}

module.exports = {
  getUsers,
  addUser,
  getUser
}