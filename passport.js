module.exports = (app, bcrypt, passport, knex) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    // console.log("serialize", user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await knex("users").where({ id }).first();
    // console.log("deserialize", id);

    if (!user) {
      return done(new Error(`Wrong user id: ${id}`));
    }
    return done(null, user);
  });

  require("./strategies/local-strategy")(passport, bcrypt, knex);
  require("./strategies/facebook-strategy")(passport, knex);
  require("./strategies/google-strategy")(passport, knex);
};
