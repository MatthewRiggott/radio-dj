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
var expressWs = require('express-ws')(app);
const port = process.env.PORT || "8000";
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
    console.debug(createHost)
    let newHost = createHost.createHost({ hostIp: "local" })
    OpenConnections.push(newHost)
    res.status(200).send(`Host URL ${newHost.code}\r\nConnections: ${OpenConnections.length}`);
});

app.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
        ws.send(msg);
    });
})
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});