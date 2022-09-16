const routes = require("express").Router();

routes.get("/", (req, res) => {
    res.send("Layne Howell")
})
module.exports = routes;