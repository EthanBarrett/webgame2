const express = require('express');
const app = express();
const port = 3000;

var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cmp5360"
});

//set up static folder
app.use(express.static('myGame'));

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.get('/', (req, res) => {
  res.send('Hello app!')
})

app.get('/some', (req, res) => {
    res.send('Change a word!')
  })

  app.get('/test', (req, res) => {
    res.send('This is test page')
  })

  //the 404 route
  app.get('*', function(req, res){
    __dirname
    console.log(__dirname);
    res.status(404).sendFile(__dirname +'/404page.html');
  });
    

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})