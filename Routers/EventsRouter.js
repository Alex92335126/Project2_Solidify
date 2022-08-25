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
    router.get("/userEvent", this.getUserEvent.bind(this));
    router.get("/:id", this.getEventParticipant.bind(this));
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
        req.body.createdDate,
        req.body.modifiedDate,
        req.body.eventType
      );
      res.json(updateEvent);
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


  //list out all users from an event
  async getEventParticipant(req, res) {
    let eventId = req.params.id;
    console.log(eventId);
    try {
      const eventParticipant = await this.eventsService.listEventParticipant(
        eventId
      );
      res.json(eventParticipant);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  // list out all events from an user
  async getUserEvent(req, res) {
    console.log("hi from user event");
    let user = req.user;
    console.log("userId", user.id);
    try {
      const allUsers = await this.eventsService.listAllUser(userId);
      res.json(allUsers);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // return (
  //   this.eventsService
  //     .list(user)
  //     .then((events) => {
  //       res.json(events);
  //     })
  //     .catch((err) => {
  //       res.status(500).json(err);
  //     })
  // );

  delete(req, res) {
    let id = req.params.id;
    let user = req.auth.user;
    return this.eventsService
      .remove(id, user)
      .then(() => {
        return this.noteService.list(user);
      })
      .then((events) => {
        res.json(events);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = EventsRouters;
