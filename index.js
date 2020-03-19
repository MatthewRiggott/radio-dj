// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const createHost = require("./src/Host.js");

/**
 * App Variables
 */
const app = express();
app.use(express.static(__dirname + '/html'));

const server = require("http").createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || "8000";
const debug = process.env.DEBUG || true

/**
 *  App Configuration
 */
var OpenConnections = []

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/html/index.html'))
});

app.get("/host", (req, res) => {
  let newHost = createHost.createHost({ hostIp: "local" })
  OpenConnections.push(newHost)
  res.status(200).send(`Host URL ${newHost.code}\r\nConnections: ${OpenConnections.length}`);
});

/**
 * Server Activation
 */


io.on('connection', function(socket){
  log('a user connected');
  socket.on('test', function(msg){
    log("test received:" + msg)
    io.emit('test', "Server Test");
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  log(`Listening to requests on http://localhost:${port}`);
});

function log(msg) {
  if (debug) {
    console.debug(msg);
  }
}

function dir(obj) {
  if (debug) {
    console.dir(obj, 2, true)
  }
}
