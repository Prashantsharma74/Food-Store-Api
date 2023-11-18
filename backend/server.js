const express = require("express")
const color = require("colors");
const { connectDB } = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 5000;

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, (req, res) => {
    console.log(`PORT is running on ${PORT}`.bgYellow);
})

app.use("/api/user", require("./Route/userRoute"))

app.use("/user", require("./Route/productRoute"))

app.use(errorHandler)

app.get("/", (req, res) => {
    res.status(200).json({ mssg: "Welcome to Food App" })
})