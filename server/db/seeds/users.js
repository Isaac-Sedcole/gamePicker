
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Isaac', profileLink: "https://steamcommunity.com/id/sedcole/"},
        {name: 'Franco', profileLink: "https://steamcommunity.com/id/licious116675/"},
        {name: 'Lewis', profileLink: "https://steamcommunity.com/profiles/76561198177879197"}
      ]);
    });
};
