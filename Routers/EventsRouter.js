const isLoggedIn = require('../middleware/isLoggedIn')

class EventsRouters {
  constructor(eventsService, express) {
    this.eventsService = eventsService;
    this.express = express;
  }

  router() {
    let router = this.express.Router();
    router.get("/", this.getAll.bind(this));
    router.post("/", this.addEvent.bind(this));
    router.put("/", this.putEvent.bind(this));
    router.delete("/", this.deleteEvent.bind(this));
    router.post("/add-participant", this.addEventParticipant.bind(this));
    router.delete("/del-participant", this.removeEventParticipant.bind(this));
    router.get("/event/:id", this.getEventParticipant.bind(this));
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

  // post add event
  async addEvent(req, res) {
    let user = req.user;
    try {
      const updateEvent = await this.eventsService.addEvent(
        req.body.eventName,
        req.body.eventStart,
        req.body.description,
        user.id,
        req.body.modifiedDate,
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
    try{
      const delEvent = await this.eventsService.removeEvent(req.body.eventId);
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
    let user = req.user;
    try{
      const delParticipant = await this.eventsService.delParticipant(user.id, req.body.eventId);
      res.json(delParticipant);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  //list out all users from an event
  async getEventParticipant(req, res) {
    try {
      const eventParticipant = await this.eventsService.getParticipant(req.params.id);
      res.json(eventParticipant);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = EventsRouters;
