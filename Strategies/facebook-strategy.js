const FacebookStrategy = require("passport-facebook").Strategy;

require("dotenv").config();

module.exports = (passport, knex) => {
//Facebook Strategy
passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "https://localhost:3000/auth/facebook/callback",
        profileFields: ["id", "email", "name"],
      },
      async (accessToken, refreshToken, profile, done) => {
  
        console.log(profile);
        // return done(null, { id: 1 });
        const user = await knex("users").where({facebook_id: profile.id}).first();//The first() function gives the first element of the collection.
        if(!user){
          let newUser = {
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            facebook_id : profile.id,
            email: profile._json.email
          };
          const id = await knex("users").insert(newUser).returning("id"); //insert username and hash pw and return id in db
          newUser.id = id[0].id; //adds id on newUser
          console.log(newUser);
        return done(null, newUser);
        } else {
          return done(null,user);
        }
      }
    )
  );

};