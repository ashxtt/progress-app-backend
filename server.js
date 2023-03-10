// .env
require("dotenv").config()

const {PORT, DATABASE_URL} = process.env
const express = require("express")
const app = express()

app.use(express.json());


//importing mongoose
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const methodOverride = require("method-override");

// App 
//const app = express();

// Database Connection
mongoose.connect(DATABASE_URL)
mongoose.connection
 .on("open", () => console.log("You are connected to MongoDB"))
 .on("close", () => console.log("You are disconnected from MongoDB"))
 .on("error", (error) => console.log(error))

// Model
const GoalSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: {type: Date, default: Date.now},
});

const Goal = mongoose.model("Goal", GoalSchema)

// Middleware
app.use(cors()); // prevents cross origin resource sharing errors, allows access to server from all origins i.e. react frontend
app.use(morgan("dev")); // logs details of all server hits to terminal
app.use(express.json()); // parse json bodies from request
app.use(express.urlencoded({ extended: false })); // to use URL encoded

//My Routes

app.get("/goals", async (req, res) => {
    try {
     res.status(200).json(await Goal.find({}))
    } catch (error) {
     res.status(400).json(error)
    }
  })

//Create
app.post("/goals", async (req, res) => {
    try {
      res.status(200).json(await Goal.create(req.body));
    } catch (error) {
      res.status(400).json(error)
    }
  })


  //delete
  app.delete('/goals/:id', async (req, res) => {
    try {
        res.status(200).json(await Goal.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})


//Update
app.put('/goals/:id', async (req, res) => {
    try {
        res.status(200).json(await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})





 // Port Listener
 app.listen(PORT, () => console.log(`Listening on ${PORT} `));