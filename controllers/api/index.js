const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const jobsRoutes = require("./jobsController");
const profileRoutes = require("./profileController")
// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/jobs", jobsRoutes);
router.use("/profile", profileRoutes);

// Export the router
module.exports = router;
