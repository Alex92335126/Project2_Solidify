// const express = require('express')

function isLoggedIn(req, res, next) {
  console.log('hi middleware')
  console.log(req.originalUrl)
  console.log(req.originalUrl === "/event" && req.method === "GET" )
    if(req.originalUrl === "/event" && req.method === "GET") {
      console.log('no authen')
      return next()
    }
    if (req.isAuthenticated()) {
      console.log("middleware authenticated", req.user)
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