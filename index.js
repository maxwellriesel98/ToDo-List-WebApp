//Written by Maxwell Riesel
//10/3/2023
//Takes input from user in the form of a
//task type and task info and puts it in a 
//list displayed by a ejs file
import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var workTasks=[];//holds all work tasks
var homeTasks=[];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) =>{

    res.sendFile(__dirname + "/public/index.html");

});

app.post("/submit", (req,res) =>{

    console.log(req.body);
    //if the task is a work task, push to workTask array, 
    //if its a home task push to homeTasks
    
    try{
        if(req.body["location"] === "Work"){
            workTasks.push(req.body["task"]);
            console.log(workTasks);
        }
        else if(req.body["location"] === "Home"){
            homeTasks.push(req.body["task"]);
            console.log(homeTasks);
        }
    }
    catch(error){
       
        console.error("Failed to make request:", error.message);

    }

    res.sendFile(__dirname + "/public/index.html");

});

app.post("/home", (req,res) => {
    res.render("index.ejs",{homeTasks});
});

app.post("/work", (req,res) => {
    res.render("index.ejs",{workTasks});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });