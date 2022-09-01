const isLoggedIn = require('../middleware/isLoggedIn')

class EventsRouters {
  constructor(eventsService, express) {
    this.eventsService = eventsService;
    this.express = express;
  }

  router() {
    let router = this.express.Router();
    router.get("/", this.getAll.bind(this));
    router.get("/my-event", this.getMyEvent.bind(this));
    router.get("/all", this.getAllEventWithPeople.bind(this));
    router.post("/", this.addEvent.bind(this));
    router.put("/", this.putEvent.bind(this));
    router.delete("/del-event/:eventId", this.deleteEvent.bind(this));
    router.post("/add-participant", this.addEventParticipant.bind(this));
    router.delete("/del-participant/:eventId", this.removeEventParticipant.bind(this));
    router.get("/participant/:id", this.getEventParticipant.bind(this));
    return router;
  }

  //list all events
  async getAll(req, res) {
    try {
      const allEvents = await this.eventsService.list();
      res.json(allEvents);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getAllEventWithPeople(req,res) {
    try {
      const allEventsWithPeople = await this.eventsService.listEventWithPeople(req.user);
      let object = {
        userId: req.user.id,
        eventList: allEventsWithPeople
      }
      res.json(object);
    } catch (error) {
      res.status(500).send(error);
    }
  }



  // post add event
  async addEvent(req, res) {
    let user = req.user;
    console.log('post event',req.body)
    try {
      const updateEvent = await this.eventsService.addEvent(
        req.body.eventName,
        req.body.eventStart,
        req.body.description,
        user.id,
        req.body.eventType
      );
      res.redirect('/');
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Use put to update event
  async putEvent(req, res) {
    let user = req.user;
    try {
      const amendEvent = await this.eventsService.putEvent(
        req.body.eventId,
        req.body.eventName,
        req.body.eventStart,
        req.body.description,
        user.id,
        req.body.createdDate,
        req.body.modifiedDate,
        req.body.eventType
      );
      res.json(amendEvent);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Delete an event 

  async deleteEvent (req, res) {
    let user = req.user;
    console.log("del event", user)
    try{
      const delEvent = await this.eventsService.removeEvent(user.id, req.params.eventId);
      res.json(delEvent);
    } catch (error) {
      res.status(500).send(error);
    }
  }

// Add user to a event (Join button)

  async addEventParticipant (req, res) { 
    let user = req.user;
    try{
      const addParticipant = await this.eventsService.addParticipant(user.id, req.body.eventId);
      res.json(addParticipant);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // if user joined an event and remove user to a event (Decline button)
  async removeEventParticipant (req, res) { 
    console.log("body", req.params.eventId)
    let user = req.user;
    try{
      const delParticipant = await this.eventsService.delParticipant(user.id, req.params.eventId);
      res.json(delParticipant);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  //list out all users from an event
  async getEventParticipant(req, res) {
    console.log('hi event ppl')
    try {
      console.log('event ppl id', req.params.id)
      const eventParticipant = await this.eventsService.getParticipant(req.params.id);
      let object = {
        participant: eventParticipant,
        joined: false,
        userId: req.user.id
      }
      
      for (let i=0; i<eventParticipant.length; i++) {
        if (req.user.id === eventParticipant[i].id) {
          object.joined = true;
          break;
        }
        }
        res.json(object);

    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getMyEvent(req, res) {
    console.log('helllo get my event')
    let user = req.user
    try {
      const myEvent = await this.eventsService.getUserEvent(user.id)
      console.log('my event', myEvent)
      res.json(myEvent)
    } catch (error) {
      res.status(500).send(error);
    }

  }
}

module.exports = EventsRouters;
