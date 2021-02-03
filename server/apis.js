const request = require( 'superagent')

const baseUrl = "http://api.steampowered.com/"
//getting steam user
const endUrl = "?key=3ECBB5E74124B0FB4037753754D5F5E4&steamids="
const steamKey = '3ECBB5E74124B0FB4037753754D5F5E4'

const baseTestUrl = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3ECBB5E74124B0FB4037753754D5F5E4&steamids=76561197960435530"
const myUrl = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3ECBB5E74124B0FB4037753754D5F5E4&steamids=76561198054358315"

//returns appid == games id
//also returns total playtime == playtime_forever
//got my id and key input
const getOwnedGamesUrl = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=3ECBB5E74124B0FB4037753754D5F5E4&steamid=76561198054358315&include_appinfo=true&format=json"

// my person steam ID key = 76561198054358315
// steam profileURL = "https://steamcommunity.com/id/sedcole/"

// return request.get(baseUrl + 'ISteamUser/GetPlayerSummaries/v0002/' + endUrl)
function GetPlayerSummaries() {
  return request.get(myUrl)
    .then(res => res.body)
}

function GetOwnedGames() {
  return request.get(getOwnedGamesUrl)
    .then(res => res.body)
}

module.exports = {
  GetPlayerSummaries,
  GetOwnedGames
}