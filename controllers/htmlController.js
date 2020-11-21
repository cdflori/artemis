// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

/**
 * Home Page, again 
 */
router.get("/home", function (req, res) {
  res.render("index", { user: req.user });
});

/**
 * Profile Page 
 */
router.get("/profile", function (req, res) {
  db.Profile.findOne({ raw: true, where: { UserId: req.user.id } }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      console.log(dbModel)
      res.render("profile", { user: req.user, profile: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Manage Profile Page 
 */
router.get("/manageprofile", function (req, res) {
  res.render("manageprofile", { user: req.user });
});

/**
 * Mobile Main Page
 */
router.get("/mobile", function (req, res) {
  res.render("mobile", { user: req.user });
});

/** 
 * Signup page
 */
router.get("/signup", function (req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/login", function (req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { user: req.user });
  }
});

/**
 * Jobs Posting Page
 */
router.get("/jobs", function (req, res) {
  res.render("jobs", { user: req.user });
});

router.get("/findjobs", function (req, res) {
  db.Jobs.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      res.render("findjobs", { user: req.user, jobs: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

router.get("/postlist", function (req, res) {
  db.User.findOne({ where: req.user.id }, { include: [db.Jobs] })
    .then(dbModel => {
      res.render("postlist", { user: req.user, jobs: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Forum Page - 
 * Notice loading our posts, with that include!
 */
router.get("/flamingle", isAuthenticated, function (req, res) {
  db.Post.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      res.render("forum", { user: req.user, posts: dbModel });
    })
    .catch(err => res.status(422).json(err));
});



/**
 * Generic Error Page
 */
router.get("*", function (req, res) {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
