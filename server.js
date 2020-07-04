// Empty Js Object
let projectData = {};

// getting express and creating instance of it
const express = require('express');
const app = express();

// Adding Middleware
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Adding cors
const cors = require('cors');
app.use(cors());

// Matching the main website folder
app.use(express.static('website'));

// Setting the get route to send the data on /all route
app.get('/all', (req,res) => {
  res.send(projectData);
});

// setting post and getting the values on /addData route
app.post('/addData', (req, res) => {
  projectData = {
    zip: req.body.zip,
    date: req.body.date,
    temp: req.body.temp,
    userFeel: req.body.userFeel
  };
});

// Setting the server to the port
const port = 8888;

const server = app.listen(port, () => {
  console.log(`Server Listening on port : ${port}`);
});