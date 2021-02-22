const request = require( 'superagent')

//process.env.steamKey will give the value we want
const baseUrl = "http://api.steampowered.com/"
//getting steam user

const getSummaryByIdDefault = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+process.env.steamKey+"&steamids=76561197960435530"
const getSummaryByIdMe = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+process.env.steamKey+"&steamids=76561198054358315"
const baseGetSummaryById = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+process.env.steamKey+"&steamids="
const getSummaryByIdFranco = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+process.env.steamKey+"&steamids=76561198012220748"
const getSummForLewis = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+process.env.steamKey+"&steamids=76561198177879197"

const getOwnedGamesUrl = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+process.env.steamKey+"&steamid=76561198054358315&include_appinfo=true&format=json"
const endOfOwnedGamesUrl = "&include_appinfo=true&format=json"
const startOfOwnedGamesUrl = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+process.env.steamKey+"&steamid="
// my person steam ID key = 76561198054358315
// steam profileURL = "https://steamcommunity.com/id/sedcole/"
// franco steam profile = "https://steamcommunity.com/id/licious116675/"
// lewis steam profile = "https://steamcommunity.com/profiles/76561198177879197"

//if index after .com/ == id - use getIdByUsername
//else just take index after .com/profiles/ as the key and call getPlayerSummary

//get steamID via username or "vanityUrlName"
const getIdByUsernameMe = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key="+process.env.steamKey+"&vanityurl=sedcole"
const getIdByUsernameFranco = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key="+process.env.steamKey+"&vanityurl=licious116675"
const getIdByUsernameDefault = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key="+process.env.steamKey+"&vanityurl="
// return request.get(baseUrl + 'ISteamUser/GetPlayerSummaries/v0002/' + endUrl)
function GetPlayerSummaries(id) {
  // return request.get(startUrl + id)
  return request.get(getSummaryByIdMe)//baseGetSummaryById+id)
    .then(res => res.body)
}

function GetOwnedGames(id) {
  return request.get(startOfOwnedGamesUrl+id+endOfOwnedGamesUrl)
    .then(res => res.body)
}

function GetSteamIdByUsername(name) {
  return request.get(getIdByUsernameDefault+name)
    .then(res => res.body)
}

module.exports = {
  GetPlayerSummaries,
  GetOwnedGames,
  GetSteamIdByUsername
}