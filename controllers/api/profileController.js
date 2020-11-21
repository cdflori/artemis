const db = require("../../models");
const router = require("express").Router();

router.get("/", function(req, res){
    db.Profile.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
});

router.get("/:id", function(req, res) {
    db.Profile.findByPk(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

router.post("/", function(req, res) {
  console.log(req)  
  db.Profile.create({
      UserId: req.user.id,
      ...req.body
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });
  
  router.put("/:id", function(req, res) {
    db.Profile.update(req.body, { where: { id: req.params.id }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  router.delete("/:id", function(req, res) {
    db.Profile.destroy({ where: { id: req.params.id }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  module.exports = router;