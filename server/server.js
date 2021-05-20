const path = require('path')
const express = require('express')
const steam = require("./apis")
const { addUser, getUsers, getUser } = require('./db/db')
const { deleteUser } = require('../client/apis/users')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))



server.post('/api/steam', (req, res) => {
  const user = req.body
  addUser(user)
  .then(id => {
    res.json(id)
    return null
  })
})

server.get('/api/steam/users', (req, res) => {
  getUsers()
  .then(users => {
    res.json(users)
    return null
  })
})

server.get('/api/steam/external/games/:id', (req, res) => {
  // console.log(req.body)
  steam.GetOwnedGames(req.params.id)
  .then(body => {
    res.json(body)
    return null
  })
  .catch(err => {
    
  })
})

server.get('/api/steam/playersumm/:id', (req, res) => {
  // console.log(req.params.id)
  steam.GetPlayerSummaries(req.params.id)
    .then(body => {
      res.json(body)
      return null
    })
})

server.get('/api/steam/external/:name', (req, res) => {
  steam.GetSteamIdByUsername(req.params.name)
    .then(body => {
      res.json(body)
      return null
    })
})

server.get('/api/steam/:name', (req, res)=> {
  const name = req.params.name
  // console.log(name)
  getUser(name)
  .then(user => {
    res.json(user)
    return null
  })
})

server.delete('/api/users/delete/:id', (req, res) => {
  deleteUser(req.params.id)
    .then(results => {
      res.json(results)
      return null
    })
})

module.exports = server
