const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
require('dotenv').config()

let task=require('./routes/taskRoutes')
let user=require('./routes/userRoutes')
let logger=require('./config/loggerConfig')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Add the CORS support using middleware
app.use(cors({
  origin:process.env.ORIGIN
}));

// parse json
var jsonObj = JSON.parse('[]');

//Task Router
app.use('/task', task);

//Task Router
app.use('/user',user);

//Create a new file `tasks.json` programmatically with an empty array on the server startup
app.use('/', function (req, res) {
 
  fs.writeFile('./user-details.json', JSON.stringify(jsonObj), (err) => {
    if (err) {
      logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).json("File Not created");
    }
    else {
      logger.info(` ${res.statusMessage} - ${"File Created"} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      fs.writeFile('./task-management.json', JSON.stringify(jsonObj), (err) => {
        if (err) {
          logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
          res.status(500).json("File Not created");
        }
        else {
          logger.info(` ${res.statusMessage} - ${"File Created"} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
          res.json("File created successfully\n");
        }
      });
    }
  });
})

app.listen(process.env.PORT, function () {
  console.log("Working on port number: " + process.env.PORT);
})

