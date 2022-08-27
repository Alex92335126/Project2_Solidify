const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport, bcrypt, knex,bodyParser) => {
  //set up local strategy //video 1:20

  passport.use(
    "local-signup", //name of startegy
    new LocalStrategy(
      { passReqToCallback: true,usernameField: "email" }, //allows us to pass back the entire request to the callback 
      async (req, email, password, done) => {
        let user = await knex("users").where({ email }).first(); //The first() function gives the first element of the collection.
        console.log("fname", req.body.firstName);
        console.log("lname", req.body.lastName);
        // console.log("test", req);
        if (user) {
          return done(null, false, { message: "User already exists" });
        }
        const hash = await bcrypt.hash(password, 10);
        let newUser = {
          firstName : req.body.firstName,
          lastName: req.body.lastName,
          email,
          password: hash,
        };
        const id = await knex("users").insert(newUser).returning("id"); //insert username and hash pw and return id in db
        newUser.id = id[0].id; //adds id on newUser
        return done(null, newUser);
      }
    )
  );

  //login 1.52
  passport.use(
    "local-login", //name of startegy
    new LocalStrategy(
      { usernameField: "email" }, //dont need to add if using username to login
      async (email, password, done) => {
        console.log("local login")
        const user = await knex("users").where({ email }).first();
        console.log("login user", user)
        if (!user) {
          return done(null, false);
        }
        const result = bcrypt.compare(password, user.password); //compares user input password with hash password
        if (result) {
          return done(null, user);
        }
        return done(null, false);
      }
    )
  );
};
