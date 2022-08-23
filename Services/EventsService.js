class EventService {
    constructor(knex) {
      this.knex = knex;
    }
  
    async list() {
      console.log("listevent");
       
      const event = await this.knex("event")
        .select("*")
      
      console.log('note service note', event)
      return event
    }

    async listbyUser(userId) {
      console.log("listuserevent");
       
      const event = await this.knex("event")
        .select("notes.content", "notes.id")
        .join("notes", "users.id", "notes.user_id")
        .where("username", user);
      
      console.log('note service note', notes)
      return notes
    }
  
    // async add(event, user) {
    //   // console.log("add_event", event, user)
    //    const event = await this.knex("users")
    //     .select("id")
    //     .where("username", user)
    //     .first()
    //     .then((data) => {
    //       //{id: 1}
    //       return this.knex("notes").insert({ user_id: data.id, content: note });
    //     });
    // }
  
    // update(id, note) {
    //   return this.knex("notes").update({ content: note }).where({ id });
    // }
  
    // remove(id) {
    //   return this.knex("notes").del().where({ id });
    // }
  }
  
  module.exports = EventService;
  