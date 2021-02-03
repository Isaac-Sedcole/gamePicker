const request = require( 'superagent')

const baseUrl = "http://api.steampowered.com/"
//getting steam user
const endUrl = "?key=3ECBB5E74124B0FB4037753754D5F5E4&steamids="
const steamKey = '3ECBB5E74124B0FB4037753754D5F5E4'

const getSummaryByIdDefault = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3ECBB5E74124B0FB4037753754D5F5E4&steamids=76561197960435530"
const getSummaryByIdMe = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3ECBB5E74124B0FB4037753754D5F5E4&steamids=76561198054358315"
const baseGetSummaryById = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3ECBB5E74124B0FB4037753754D5F5E4&steamids="
const getSummaryByIdFranco = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3ECBB5E74124B0FB4037753754D5F5E4&steamids=76561198012220748"

//returns appid == games id
//also returns total playtime == playtime_forever
//got my id and key input
const getOwnedGamesUrl = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=3ECBB5E74124B0FB4037753754D5F5E4&steamid=76561198054358315&include_appinfo=true&format=json"
const id = '76561198054358315'
// my person steam ID key = 76561198054358315
// steam profileURL = "https://steamcommunity.com/id/sedcole/"
// franco steam profile = "https://steamcommunity.com/id/licious116675/"
// lewis steam profile = "https://steamcommunity.com/profiles/76561198177879197"

//get steamID via username or "vanityUrlName"
const getIdByUsernameMe = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3ECBB5E74124B0FB4037753754D5F5E4&vanityurl=sedcole"
const getIdByUsernameFranco = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3ECBB5E74124B0FB4037753754D5F5E4&vanityurl=licious116675"

// return request.get(baseUrl + 'ISteamUser/GetPlayerSummaries/v0002/' + endUrl)
function GetPlayerSummaries() {
  // return request.get(startUrl + id)
  return request.get(getSummaryByIdFranco)
    .then(res => res.body)
}

function GetOwnedGames() {
  return request.get(getOwnedGamesUrl)
    .then(res => res.body)
}

function GetSteamIdByUsername() {
  return request.get(getIdByUsernameFranco)
    .then(res => res.body)
}

module.exports = {
  GetPlayerSummaries,
  GetOwnedGames,
  GetSteamIdByUsername
}