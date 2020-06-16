const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");

// Book routes
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.post("/campground", (req, res) => {
    res.json({message: "Route exists!"})
})

module.exports = router;
