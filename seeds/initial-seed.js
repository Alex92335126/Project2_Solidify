/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {first_name: 'Peter', 
    last_name: 'Pan', 
    username: 'Stan', 
    email: 'peter_pan@gmail.com', 
    password: 'password', 
    signup_type: "social",
    social_signup_id: '',
  },
  ]);
  await knex('event').del()
  await knex('event').insert([
    {event_name: 'basketball', 
    event_start: '30/8/2022', 
    description: '3_on_3_basketball ', 
    creator: '1', 
    created_date: '25/8/2022',
    // modified_date: '',
    event_type: 'sport', 
    is_active: 'true',
  },
  ]);
  await knex('event_participant').del()
  await knex('event_participant').insert([
    {user_id: '1',
    event_id: '1',
  },
  ]);

  

};
