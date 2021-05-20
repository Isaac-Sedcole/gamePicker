const connection = require('./connection')

function getUsers (db = connection) {
  return db('users').select()
}

function addUser(user, db = connection) {
  return db('users')
  .insert(user, "id")
}

function getUser(name, db=connection) {
  return db('users')
  .where("name", name)
  .first()
  .select()
}

function deleteUser(id, db = connection) {
  return db('users')
  .delete()
  .where("id", id)
  .then(rowCount => {
    return rowCount
  })
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  deleteUser
}