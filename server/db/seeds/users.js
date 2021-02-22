
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Isaac', profileLink: "https://steamcommunity.com/id/sedcole/"},
        {name: 'Franco', profileLink: "https://steamcommunity.com/id/licious116675/"},
        {name: 'Lewis', profileLink: "https://steamcommunity.com/profiles/76561198177879197"},
        {name: 'Yang', profileLink: "https://steamcommunity.com/profiles/76561198871297150"},
        {name: 'Tim', profileLink: "https://steamcommunity.com/profiles/76561198084686771"},
        {name: 'Waseem', profileLink: "https://steamcommunity.com/profiles/76561198140582970"},
        {name: 'Andrew', profileLink: "https://steamcommunity.com/profiles/76561198022600500"},
        {name: 'Dane', profileLink: "https://steamcommunity.com/profiles/76561198171122074"},
        {name: 'Dave', profileLink: "https://steamcommunity.com/profiles/76561198009952379"},
        {name: 'Lachlan', profileLink: "https://steamcommunity.com/id/Kampz"},
        {name: 'Kienan', profileLink: "https://steamcommunity.com/id/YiuChung"},
        {name: 'Lenny', profileLink: "https://steamcommunity.com/id/lennyc1nz"},
      ]);
    });
};
