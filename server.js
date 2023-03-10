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

//My Routes

app.get("/goals", async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

//Create
app.post("/goal/new", async (req, res)=>{
    const goal = new Goal({
        title: req.body.title,
        body: req.body.body,
        date: req.body.date
    });
    goal.save();
    //add to our list
    res.json(goal);
});

app.delete('/goal/delete/:id', async (req, res) => {
    const result = await Goal.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.put('goal/complete/:id', async (req, res) => {
    const goal = await Goal.findByIdAndUpdate(req.params.id);

    

    goal.save();

    res.json(goal);
})



// Middleware
app.use(cors()); // prevents cross origin resource sharing errors, allows access to server from all origins i.e. react frontend
app.use(morgan("dev")); // logs details of all server hits to terminal
app.use(express.json()); // parse json bodies from request
app.use(express.urlencoded({ extended: false })); // to use URL encoded





 // Port Listener
 app.listen(PORT, () => console.log(`Listening on ${PORT} `));