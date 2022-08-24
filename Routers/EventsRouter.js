class EventsRouters {
    constructor(eventsService, express) {
      this.eventsService = eventsService;
      this.express = express;
    }

    router() {
      let router = this.express.Router();
      router.get("/", this.getAll.bind(this));
      router.get("/:id", this.getEventParticipant.bind(this))
      router.get("/:id", this.getUserEvent.bind(this))
      router.post("/", this.postEvent.bind(this));
      router.put("/:id", this.put.bind(this));
      router.delete("/:id", this.delete.bind(this));
      return router;
    }
  
  //list all events 
    async getAll(req, res) {
      // ==== auth checking =====
      // let user = req.auth.user;
      // console.log("auth user", user); 
      try {
        const allEvents = await this.eventsService.list()
        res.json(allEvents)
      } catch (error) {
        res.status(500).send(error)
      }
    }
  //list out all users from an event 
    async getEventParticipant(req, res) {
      let eventId = req.params.id
      console.log(eventId)
      try {
        const eventParticipant = await this.eventsService.listEventParticipant(eventId)
        res.json(eventParticipant)
      } catch (error) {
        res.status(500).send(error) 
      }
    }
// list out all events from an user
    async getUserEvent(req, res) {
      let userId = req.params.id
      console.log(userId)
      try {
        const allUsers = await this.eventsService.listAllUser(userId)
        res.json(allUsers)
      } catch (error) {
        res.status(500).send(error) 
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
  
// post add event 
    async postEvent(req, res) {
      let user = req.auth.user;
      try{
        const updateEvent =  await this.eventsService.addEvent(req.body.event, user)
        res.json(updateEvent)
      }  catch (error) {
        res.status(500).send(error) 
      }
    }
  
    // put(req, res) {
    //   let id = req.params.id;
    //   let note = req.body.note;
    //   let user = req.auth.user;
    //   console.log("id", id);
    //   return (
    //     this.eventsService
    //       .update(id, note, user)
    //       .then(() => {
    //         return this.noteService.list(user);
    //       })
    //       .then((events) => {
  
    //         res.json(events);
    //       })
    //       .catch((err) => {
    //         res.status(500).json(err);
    //       })
    //   );
    // }
  
    delete(req, res) {
      let id = req.params.id;
      let user = req.auth.user;
      return (
        this.eventsService
          .remove(id, user)
          .then(() => {
            return this.noteService.list(user);
          })
          .then((events) => {
            res.json(events);
          })
          .catch((err) => {

            res.status(500).json(err);
          })
      );
    }
  }
  
  module.exports = EventsRouters;