import request from 'superagent'

export function GetPlayerSummaries(id) {
  // return request.get(baseUrl + 'ISteamUser/GetPlayerSummaries/v0002/' + endUrl)
  //gives userID, profile link
  return request.get('/api/steam/playersumm/'+id)
    .then(res => res.body)
}

//returns object { "response" { "game_count":766, "games": [{"appid:240","name":Counter-Strike Source, "playtime_forever":0,},{}]}}
export function GetOwnedGames(id) {
  //gives total games owned, games id and total playtime in minutes
  return request.get('/api/steam/external/games/'+id)
    .then(res => {
      // console.log(res.body)
      return res.body})
}

//returns object { "response": {"steamid": "76561198012220748", "success": 1}}
export function GetSteamIdByUsername(name) {
  return request.get('/api/steam/external/'+name)
    .then(res =>  {
      // console.log(res.body)
      return res.body})
}

export function addSteamUser(users) {
  return request.post('/api/steam')
    .send(users)
    .then(res => res.body)
}

export function getAllUsers() {
  return request.get('/api/steam/users')
    .then(res => res.body)
}

export function getUserByName(name) {
  return request.get('api/steam/'+name)
    .then(res => {
      // console.log(res.body)
      return res.body
    })
  }