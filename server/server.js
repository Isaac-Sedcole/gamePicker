const path = require('path')
const express = require('express')
<<<<<<< HEAD
=======
const steam = require("./apis")
>>>>>>> boilerplate-react-webpack/Isaac

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

<<<<<<< HEAD
=======
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

>>>>>>> boilerplate-react-webpack/Isaac
module.exports = server
