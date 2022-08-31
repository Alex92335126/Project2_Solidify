/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      firstName: 'Peter', 
      lastName: 'Pan', 
      email: 'peter_pan@gmail.com', 
      password: 'password', 
      facebook_id: '123234132',
      google_id: '23847912'
    },
    {
      firstName: 'John', 
      lastName: 'Doe', 
      email: 'johndoe@gmail.com', 
      password: 'password', 
      facebook_id: '123234132',
      google_id: '23847912'
    }
  ]);
  await knex('event').del()
  await knex('event').insert([
    {
      event_name: 'basketball', 
      event_start: '2022/8/30', 
      description: '3 on 3 basketball', 
      creator: '1', 
      created_date: '2022/9/30',
      event_type: 'sport', 
      is_active: 'true',
    },
  ]);
  await knex('event_participant').del()
  await knex('event_participant').insert([
    {
      user_id: '1',
      event_id: '1',
    },
  ]);

  

};
