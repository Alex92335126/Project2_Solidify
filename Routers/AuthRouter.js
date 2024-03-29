class AuthRouter {
  constructor(express, passport) {
    this.express = express;
    this.passport = passport;
  }

  isLogged(req, res, next) {
    if (req.isAuthenticated()) {
      // console.log("middleware", req.user)
      res.locals.user = req.user
      return next();
    }
    res.redirect("/login");
  }

  isNotLogged(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }

  isAdmin(req,res,next){ //trying to check if the user is admin
    if(req.isAuthenticated() && (req.user.is_admin === 1)){
      return next();
    }
    res.redirect("/admin")
  }
  
  // Handlebars Router  
  // Homepage
  router() {
    let router = this.express.Router();

    router.get("/", (req, res) => {
      console.log("isLogged",req.isAuthenticated())
      res.render("home", {
       logged: req.isAuthenticated(),
        title: "Home Page",
      });
    });
  //Add Event Page 
    router.get("/add-event", this.isLogged, (req, res) => {
      res.render("add-event", {
        user: req.user.firstName,
        title: "Add Event",
        logged: req.isAuthenticated()
      });
    });
  //Calendar Page 
    router.get("/calendar", this.isLogged, (req, res) => {
      res.render("calendar", {
        title: "Calendar",
        logged: req.isAuthenticated(),
      });
    });
  //Calendar Page 2//
    router.get("/calendar2", (req, res) => {
      res.render("calendar2", {
        title: "Calendar2",
        logged: req.isAuthenticated(),
      });
    });
  //Sign Up Pate 
    router.get("/signup", this.isNotLogged, (req, res) => {
      res.render("signup", {
        title: "Sign Up Now",
        logged: req.isAuthenticated(),
      });
    });
  //Log In Page 
    router.get("/login", this.isNotLogged, (req, res) => {
      res.render("login", {
        title: "Login Page",
        logged: req.isAuthenticated(),
      });
    });


    router.get(
      "/auth/facebook",
      this.isNotLogged,
      this.passport.authenticate("facebook", {
        scope: ["email", "public_profile"],
      })
    );

    router.get(
      "/auth/google",
      // this.isNotLogged,
      this.passport.authenticate("google", {
        scope: ["profile", "email"],
      })
    );

    router.get(
      "/auth/facebook/callback",
      this.passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/login",
      })
    );
    router.get(
      "/auth/google/callback",
      this.passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login",
      })
    );

    router.post(
      "/signup",
      this.isNotLogged,
      this.passport.authenticate("local-signup", {
        successRedirect: "/login",
        failureRedirect: "/signup",
        failureFlash: true,
      })
    );

    router.post(
      "/login",
      this.isNotLogged,
      this.passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
      })
    );

    router.get("/logout", this.isLogged, (req, res) => {
      req.logout(function (err) {
        if (err) {
          return err;
        }
        res.redirect("/login");
      });
    });

    return router;
  }
}

module.exports = AuthRouter;
