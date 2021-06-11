var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var expressWs = require('express-ws')

var expressWs = expressWs(express());
var app = expressWs.app;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

const db = require('./app/config/db.config.js');
  
//force: true will drop the table if it already exists
// db.sequelize.sync({force:true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

//require('./app/routes/customer.route.js')(app);
require('./app/routes/user.route.js')(app);
 
app.ws('/a', function(ws, req) {

  ws.on('message', function(msg) {
    console.log('hello');
  })
});

// Create a Server
var server = app.listen(80, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})