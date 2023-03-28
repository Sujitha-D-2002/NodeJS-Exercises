const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// json data empty array
let jsonData = '[]';


// parse json
var jsonObj = JSON.parse(jsonData);

filePath = __dirname + '/cdw_ace23_buddies.json';


//to create a new buddylist in json file
let addBuddy = require('./routes/createBuddy')
app.use('/add', addBuddy);

//to display buddylist in json file
let displayBuddy = require('./routes/displayBuddy')
app.use('/display', displayBuddy);

//to delete buddylist in json file
let deleteBuddy = require('./routes/deleteBuddy')
app.use('/delete', deleteBuddy);

//to update buddylist in json file
let updateBuddy = require('./routes/updateBuddy')
app.use('/update', updateBuddy);


//Create a new file `cdw_ace23_buddies.json` programmatically with an empty array on the server startup
app.use('/', function (req, res) {
  fs.writeFile(filePath, JSON.stringify(jsonObj, null, 2), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File created successfully\n");
    }
  });
})

app.listen(PORT, function () {
  console.log("Working on port number: " + PORT);
})

