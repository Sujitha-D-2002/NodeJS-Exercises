const express = require('express');
const fs = require('fs');
//buddylist
let buddy = require('./routes/buddyRouter')

const app = express();
const PORT = 5100;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// json data empty array
let jsonData = '[]';

// parse json
var jsonObj = JSON.parse(jsonData);

filePath = __dirname + '/cdw_ace23_buddies.json';
app.use('/buddy', buddy);

//Create a new file `cdw_ace23_buddies.json` with an empty array on the server startup
app.use('/', function (req, res) {
  fs.writeFile(filePath, JSON.stringify(jsonObj, null, 2), (err) => {
    if (err)
      console.log(err);
    else {
      res.send("File created successfully\n");
    }
  });
})

app.listen(PORT, function () {
  console.log(`Working on port number: ${PORT}`);
})

