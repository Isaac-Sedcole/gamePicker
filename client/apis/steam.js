import request from 'superagent'

export function GetPlayerSummaries() {
  // return request.get(baseUrl + 'ISteamUser/GetPlayerSummaries/v0002/' + endUrl)
  //gives userID, profile link
  return request.get('/api/steam')
    .then(res => res.body)
}

export function GetOwnedGames() {
  //gives total games owned, games id and total playtime in minutes
  return request.get('/api/steam/games')
    .then(res => res.body)
}