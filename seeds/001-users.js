
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Dom', password: 'sdois98y3'},
        {id: 2, username: 'Tom', password: '2398ew98y'},
        {id: 3, username: 'Isaac', password: '8dsfy7w4j'}
      ]);
    });
};
