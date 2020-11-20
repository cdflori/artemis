const db = require("../../models");
const router = require("express").Router();

router.get("/", function(req, res){
    db.Jobs.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
});

router.get("/:id", function(req, res) {
    db.Jobs.findByPk(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

router.post("/", function(req, res) {
    db.Jobs.create({
      UserId: req.user.id,
      ...req.body
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });
  
  router.put("/:id", function(req, res) {
    db.Jobs.update(req.body, { where: { id: req.params.id }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  router.delete("/:id", function(req, res) {
    db.Jobs.destroy({ where: { id: req.params.id }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  module.exports = router;