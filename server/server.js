const path = require('path')
const express = require('express')
const steam = require("./apis")
const { addUser, getUsers, getUser } = require('./db/db')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.get('/api/steam', (req, res) => {
  steam.GetPlayerSummaries()
    .then(body => {
      res.json(body)
    })
})

server.get('/api/steam/games', (req, res) => {
  // console.log(req.body)
  steam.GetOwnedGames()
    .then(body => {
      res.json(body)
    })
    .catch(err => {
      
    })
})

server.get('/api/steam/id', (req, res) => {
  steam.GetSteamIdByUsername()
    .then(body => {
      res.json(body)
    })
})

server.post('/api/steam', (req, res) => {
  const user = req.body
  addUser(user)
    .then(id => {
      res.json(id)
    })
})

server.get('/api/steam/users', (req, res) => {
  getUsers()
  .then(users => {
    res.json(users)
  })
})

server.get('/api/steam/:name', (req, res)=> {
  const name = req.params.name
  // console.log(name)
  getUser(name)
  .then(user => {
    res.json(user)
  })
})

module.exports = server
