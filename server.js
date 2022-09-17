const express = require("express")
const app = express()
const port = 3000

/* app.get("/", (req, res) => {
    res.send("Totally believe this worked!")
})
*/
app.use("/", require("./routes"))

app.listen(port, () => {
    console.log(`Testing App listening on port ${port}`)
})