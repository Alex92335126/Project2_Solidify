class EventService {
  constructor(knex) {
    this.knex = knex;
  }

  //list all events
  async list() {
    console.log("listevent");

    const event = await this.knex("event").select("*").orderBy("event_start");

    // console.log("events service", event);
    return event;
  }

  async listEventWithPeople(user) {
    console.log("listeventwithpeople");

    const event = await this.knex("event").select("*").orderBy("event_start");

    for (let i=0; i<event.length;i++) {
      let participant = await this.knex("event_participant")
    .join("users", "users.id", "event_participant.user_id")
    .select("users.firstName", "users.id")
    .where({event_id: event[i].id})

    for (let j=0; j<participant.length; j++) {
      console.log('part id', participant[j].id);
      console.log('user id', user.id)
      event[i].participant = participant
    if (participant[j].id === user.id) {
      event[i].joined = true;
    } else {
      event[i].joined = false;
    }
    }
    }
    return event;

    // console.log("events service", event);
    return event;
  }
  
  //post add event
  async addEvent(
    eventName,
    eventStart,
    description,
    creator,
    eventType
  ) {
    console.log("creator id", creator)
    const data = this.knex.transaction(async(trx) => {
      const eventId = await trx.insert({
        event_name: eventName,
        event_start: eventStart,
        description,
        creator,
        created_date: new Date(),
        event_type: eventType,
        is_active: "true",
      }).into("event").returning("id")
      console.log('event id', eventId)
      await trx.insert({
        user_id: creator,
        event_id: eventId[0].id
      }).into("event_participant")
    })
    // console.log("add event", data)
    return data
    
    // const [eventId] = await this.knex("event").insert({
    //   event_name: eventName,
    //   event_start: eventStart,
    //   description,
    //   creator,
    //   created_date: new Date(),
    //   event_type: eventType,
    //   is_active: "true",
    // }).returning("id");
    // const addCreatorToEventParticipant = await this.knex("event_participant")
    // .insert({
    //   user_id: creator,
    //   event_id: eventId
    // })
    // return addCreatorToEventParticipant
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

  async removeEvent(userId, eventId) {
    const eventCreator = await this.knex("event").select("creator").where({ id: eventId })
    if (userId === eventCreator[0].creator) {
      const data = this.knex.transaction(async(trx) => {
        const delPpl = await trx("event_participant").del().where({event_id: eventId})
        const delEvent = await trx("event").del().where({id: eventId})
      })
      // console.log("add event", data)
      return data
    }
    console.log(eventCreator)

    // return await this.knex("event").del().where({id: eventId}); 
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
    console.log("event id", eventId);
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
    .select("users.firstName", "users.id")
    .where({event_id: eventId})
  }

  async getUserEvent(userId) {
    console.log("service my event", userId)
    // return await this.knex("event_participant")
    // .distinctOn("user_id")
    return await this.knex("event_participant")
    .join("event", "event.id", "event_participant.event_id")
    .select("event.event_name", "event.id")
    .select("event.event_start", "event.id")
    .where({user_id: userId})
  }
}


module.exports = EventService;
