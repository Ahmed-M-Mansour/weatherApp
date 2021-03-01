// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
//We're configuring express to use body-parser as middle-ware in this example.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Set up the project's key folder.
app.use(express.static('website'));
// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening()
 {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
//Set up the project's key folder.
// Callback function to complete GET '/all'
app.get('/getRoute', sendData);
function sendData(request, response) 
{
  response.send(projectData);
};
// Post Route
app.post('/postRoute', postAllData);

function postAllData(request, response)
 {
  let data = request.body;
  projectData["temp"] = data.temp;
  projectData["feelings"] = data.feelings;
  projectData["date"] = data.date;
  response.send(projectData)
}
