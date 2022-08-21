class UsersService {
    constructor(knex) {
      this.knex = knex;
    }
  
    list() {
      return this.knex("users")
        .select("*")
    }
  
    add(user) {
      console.log("user service user", user)
      return this.knex("users")
        .insert({ username: user.username, password: user.password });
    }
  
    async update(pwd, user) {
      console.log("update user function user", user)
      const existingUser = await this.knex("users")
        .where({ username: user.user, password: user.password})
        .first();
      console.log("existing user", existingUser)
      if(existingUser) {
        return this.knex("users")
          .update({password: pwd})
          .where({id: existingUser.id})
      }
      return false
    }
  
    remove(id) {
      return this.knex("users").del().where({ id });
    }
  }
  
  module.exports = UsersService;
  