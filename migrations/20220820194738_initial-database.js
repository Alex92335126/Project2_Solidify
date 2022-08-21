/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('user',(table)=>{
        table.increments();
        table.string("first_name");
        table.string("last_name");
        table.string("username");
        table.string("email");
        table.string("password");
        table.string("signup_type");
        table.string("social_signup_id")
        table.timestamps(false,true);
      });

    await knex.schema.createTable('event',(table)=>{
        table.increments();
        table.string("event_name");
        table.string("event_start");
        table.string("description");
        table.integer("creator").unsigned();
        table.foreign("creator").references("user.id");
        table.string("created_date");
        table.string("modified_date");
        table.string("event_type");
        table.boolean("is_active");
        table.timestamps(false,true);
      });

    await  knex.schema.createTable('event_participant',(table)=>{
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("user.id");
        table.integer("event_id").unsigned();
        table.foreign("event_id").references("event.id");
        table.timestamps(false,true);
    });


};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('event_participant');
    await knex.schema.dropTable('event');
    await knex.schema.dropTable('user');
  
};
