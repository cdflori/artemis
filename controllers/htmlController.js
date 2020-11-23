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
  if (req.user) {
    db.Profile.findOne({ raw: true, where: { UserId: req.user.id } }) // Joins User to Posts! And scrapes all the seqeulize stuff off
      .then(dbModel => {
        console.log(dbModel)
        res.render("profile", { user: req.user, profile: dbModel });
      })
      .catch(err => res.status(422).json(err));
  }
  else {
    res.redirect("/signup")
  }
});

/**
 * Manage Profile Page 
 */
router.get("/manageprofile", function (req, res) {
  if (req.user) {
    res.render("manageprofile", { user: req.user });
  }
  else {
    res.redirect("/signup")
  }
});

router.get("/test", function (req, res) {
  res.render("test", { user: req.user });
});
/**
 * About Us Page
 */
router.get("/about", function (req, res) {
  res.render("about", { user: req.user });
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
    res.redirect("/manageprofile");
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
  if (req.user) {
    res.render("jobs", { user: req.user });
  }
  else {
    res.redirect("/signup")
  }
});

router.get("/findjobs", function (req, res) {
  if (req.user) {
    Promise.all([
      db.Jobs.findAll({ raw: true, include: [db.User] }), 
      db.Profile.findOne({where: {UserId: req.user.id}, raw: true})
    ])
      .then(([jobs, profile]) => {
        console.log(profile)
        res.render("findjobs", { user: req.user, jobs, profile });
      })
      .catch(err => res.status(422).json(err));
  }
  else {
    res.redirect("/signup")
  }
});

router.get("/postlist", function (req, res) {

  if (req.user) {
    db.Jobs.findAll({ where: { UserId: req.user.id }, raw: true, include: [] })
      .then(dbModel => {
        res.render("postlist", { user: req.user, jobs: dbModel });
        console.log(dbModel);

      })
      .catch(err => res.status(422).json(err));
  }
  else {
    res.redirect("/signup")
  }

});

router.get("/viewpost/:id", function (req, res){
  if (req.user) {
    Promise.all([
      db.Jobs.findOne({ raw: true, include: [db.User], where: {id: req.params.id}}), 
      db.Applicants.findAll({where: {JobId: req.params.id}, include: [db.Profile], raw: true })
    ]).then (function([job, applicants]){
      console.log(applicants)
      res.render("viewpost", { user: req.user, job, applicants });
    })
  }
  else {
    res.redirect("/signup")
  }
})

/**
 * Forum Page - 
 * Notice loading our posts, with that include!
 */
router.get("/flamingle", function (req, res) {
  if (req.user) {
    db.Post.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
      .then(dbModel => {
        res.render("forum", { user: req.user, posts: dbModel });
      })
      .catch(err => res.status(422).json(err));
  }
  else {
    res.redirect("/signup")
  }
});



/**
 * Generic Error Page
 */
router.get("*", function (req, res) {
  res.render("errors/404", { user: req.user });
});



module.exports = router;
