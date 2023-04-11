const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
let buddy = require('./routes/buddyRouter')
let logger=require('./utils/logger')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// json data empty array
let jsonData = '[]';

// Add the CORS support using middleware
app.use(cors({
  origin:["http://127.0.0.1:5500/","http://localhost:5500/"],
  method:["get","post","put","delete"]
}));

// parse json
var jsonObj = JSON.parse(jsonData);

app.use('/buddy', buddy);

filePath = __dirname + '/cdw_ace23_buddies.json';

//Create a new file `cdw_ace23_buddies.json` programmatically with an empty array on the server startup
app.use('/', function (req, res) {
 
  fs.writeFile(filePath, JSON.stringify(jsonObj), (err) => {
    if (err) {
      logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).send("File Not created");
    }
    else {
      res.send("File created successfully\n");
    }
  });
  //}
})

app.listen(process.env.PORT, function () {
  logger.info(`${"Working on port number: " + process.env.PORT}`);
})

