const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

module.exports = (passport, knex) => {
    //Google Strategy
passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "https://localhost:3000/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log(profile);
      
        try {
          const user = await knex("users")
            .where({ google_id: profile.id })
            .first(); //The first() function gives the first element of the collection.
          if (!user) {
            let newUser = {
              firstName: profile._json.given_name,
              lastName: profile._json.family_name,
              google_id: profile.id,
              email: profile._json.email,
            };
            const id = await knex("users").insert(newUser).returning("id");//insert username and hash pw and return id in db
            newUser.id = id[0].id;
            return done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (err) {
          console.log(err);
          return done(err, false);
        }
      }
    )
  );
};