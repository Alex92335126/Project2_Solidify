class EventService {
  constructor(knex) {
    this.knex = knex;
  }

  //list all events
  async list() {
    console.log("listevent");

    const event = await this.knex("event").select("*");

    console.log("events service", event);
    return event;
  }
  //post add event
  async addEvent(
    eventName,
    eventStart,
    description,
    creator,
    modifiedDate,
    eventType
  ) {
    return this.knex("event").insert({
      event_name: eventName,
      event_start: eventStart,
      description,
      creator,
      created_date: new Date(),
      modified_date: modifiedDate,
      event_type: eventType,
      is_active: "true",
    });
  }

  //Use put to update event 

  async putEvent(
    eventId,
    eventName,
    eventStart,
    description,
    creator,
    createdDate,
    modifiedDate,
    eventType
  ) {
    return await this.knex("event")
      .update({
        event_name: eventName,
        event_start: eventStart,
        description,
        creator,
        created_date: createdDate,
        modified_date: modifiedDate,
        event_type: eventType,
        is_active: "true",
      })
      .where({ id: eventId });
  }

// Delete an event 

  async removeEvent(eventId) {
    return await this.knex("event").del().where({id: eventId}); 
  }

// Add user to a event (Join button)
  async addParticipant(userId, eventId) {
    console.log("userId", userId);
    return await this.knex("event_participant")
    .insert({
      user_id: userId,
      event_id: eventId
    })
  }
// if user joined an event and remove user to a event (Decline button)
  async delParticipant(userId, eventId) {
    console.log("userId", userId);
   return await this.knex("event_participant")
    .del()
    .where({
      user_id: userId,
      event_id: eventId
    })
}
  //list out all users from an event
async getParticipant(eventId) {
  return await this.knex("event_participant")
    .join("users", "users.id", "event_participant.user_id")
    .select("users.firstName")
    .where({event_id: eventId})
    }
}

module.exports = EventService;
