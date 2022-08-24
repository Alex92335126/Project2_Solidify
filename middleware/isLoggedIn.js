// const express = require('express')

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("middleware", req.user)
      res.locals.user = req.user
      return next();
    }
    res.redirect("/login");
}

function isNotLogged(req, res, next) {
if (!req.isAuthenticated()) {
    return next();
}
res.redirect("/");
}

module.exports = {isLoggedIn, isNotLogged};