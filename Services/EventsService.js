class EventService {
    constructor(knex) {
      this.knex = knex;
    }
  
//list all events 
    async list() {
      console.log("listevent");
       
      const event = await this.knex("event")
        .select("*")
      
      console.log('events service', event)
      return event
    }

    async addEvent(
      eventName, 
      eventStart, 
      description, 
      creator,
      createdDate,
      modifiedDate,
      eventType
      ) {
          return this.knex("event").insert(
            { 
              event_name: eventName,
              event_start: eventStart,
              description,
              creator,
              created_date: createdDate,
              modified_date: modifiedDate,
              event_type: eventType,
              is_active: 'true'
            }
          );
    }

//list out all users from an event 
    async listEventParticipant(eventId) {
      console.log("eventID", eventId);
       
      const event = await this.knex("event")
        .select(event.creator)
        .where()
      
      console.log('firstName service', userId)
      return user
    }
// list out all events from an user
    async UserEvent(userId) {
      console.log("userId", userId);
  
    }
  

  
    // update(id, note) {
    //   return this.knex("notes").update({ content: note }).where({ id });
    // }
  
    // remove(id) {
    //   return this.knex("notes").del().where({ id });
    // }
  }
  
  module.exports = EventService;
  