const path = require('path')
const express = require('express')
const steam = require("./apis")

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
  steam.GetOwnedGames()
    .then(body => {
      res.json(body)
    })
})

server.get('/api/steam/id', (req, res) => {
  steam.GetSteamIdByUsername()
    .then(body => {
      res.json(body)
    })
})

server.post('/api/steam', (req, res) => {
  
})

module.exports = server
