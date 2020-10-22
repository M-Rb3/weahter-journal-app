// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


//we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
// Setup Server
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});


app.get('/all',getData)
function getData(req,res){
  res.send(projectData)
  console.log(projectData)
}

// posting new entry to js object
app.post('/addInfo', addInfo);
function addInfo(req,res){
  projectData['date']=req.body.date
  projectData['temp']=req.body.temp
  projectData['feelings']=req.body.feelings
  res.send(projectData)
  console.log(projectData)
}
