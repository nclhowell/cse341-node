const routes = require("express").Router();
const { index } = require("../controllers/index")

// routes.get("/", (req, res) => {
//    res.send("Layne Howell!!!")

routes.get("/", index)
module.exports = routes;