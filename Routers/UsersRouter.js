class UsersRouter {
    constructor(usersService, express) {
      this.usersService = usersService;
      this.express = express;
    }

    router() {
      let router = this.express.Router();
      // router.get("/", this.get.bind(this));
      // router.post("/", this.post.bind(this));
      router.put("/update-pwd", this.put.bind(this));
      router.delete("/:id", this.delete.bind(this));
      return router;
    }
  
    //GET Method  

    async get(req, res) {
      // let user = req.auth.user;
      // console.log("listUser", user)
      try {
        const listuser = await this.usersService.list()
        res.json(listuser); 
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
    }

    //post method
    async post(req, res) {
      let user = req.auth.user;
      let addUser = req.body.user
      console.log(req.body.user)
      const addedUser = await this.usersService.add(addUser)
      console.log('add user', addedUser)
      res.json(addedUser)
    }

    //put method 
    async put(req, res) {
      let id = req.params.id;
      let pwd = req.body.password;
      let user =  req.auth;
      console.log(pwd, user)
      const updatedUser = await this.usersService.update(pwd, user)
      res.json(updatedUser)
    }

    //delete method
    async delete(req, res) {
      let id = req.params.id;
      let user = req.auth.user;
      const removeUser = this.usersService.remove(id, user)
      console.log (id, user)
      res.json(removeUser); 
    }
  }
  
  module.exports = UsersRouter;