// .env
require("dotenv").config()

const {PORT, DATABASE_URL} = process.env
const express = require("express")
const app = express()

//importing mongoose
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")

// Database Connection
mongoose.connect(DATABASE_URL)
mongoose.connection
 .on("open", () => console.log("You are connected to MongoDB"))
 .on("close", () => console.log("You are disconnected from MongoDB"))
 .on("error", (error) => console.log(error))

 // Port Listener
 app.listen(PORT, () => console.log(`Listening on ${PORT} `));