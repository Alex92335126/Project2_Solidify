class EventsRouters {
    constructor(eventsService, express) {
      this.eventsService = eventsService;
      this.express = express;
    }

    router() {
      let router = this.express.Router();
      router.get("/", this.get.bind(this));
      router.post("/", this.post.bind(this));
      router.put("/:id", this.put.bind(this));
      router.delete("/:id", this.delete.bind(this));
      return router;
    }
  
    get(req, res) {
      let user = req.auth.user;
      console.log("auth user", user); 
      return (
        this.eventsService
          .list(user)
          .then((events) => {
            res.json(events);
          })
          .catch((err) => {
            res.status(500).json(err);
          })
      );
    }
    getUserEvents(req, res) {
      console.log('userid', req.body)
  
    }
  
    /** # Post Method   #
  /*  ====================== */
    // 2) Create a post method
    post(req, res) {
      console.log('HI post note router')
      let user = req.auth.user;
      return (
        this.eventsService
          .add(req.body.note, user)
          // call the add method here and pass note and user
          .then(() => {
            // list the notes of the user
            return this.eventsService.list(user);
          })
          .then((events) => {
            res.json(events);
          })
          .catch((err) => {
            res.status(500).json(err);
          })
      );
    }
  
    put(req, res) {
      let id = req.params.id;
      let note = req.body.note;
      let user = req.auth.user;
      console.log("id", id);
      return (
        this.eventsService
          .update(id, note, user)
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