const db = require("../../models");
const router = require("express").Router();

router.post("/apply", function (req, res){
    if (req.user) { 
        db.Applicants.create({ProfileId: req.body.profileId, JobId: req.body.jobId})
    }
    else {
        res.status(401).json({error: "Unauthorized"})
    }
})

module.exports = router;