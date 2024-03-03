import express from "express"
const app = express()
const port = 5500

app.set("view engine", "hbs")
app.set("views", "src/views")

app.use("/assets", express.static("src/assets"))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/addProject", (req, res) => {
    res.render("addProject")
})

app.get("/contactMe", (req, res) => {
    res.render("contactMe")
})

app.get("/testimonials", (req, res) => {
    res.render("testimonials")
})

app.listen(port, () => {
    console.log(`Successfully running on port ${port}`)
})