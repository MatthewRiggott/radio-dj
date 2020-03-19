
var socket = io();

socket.on("connect", function(msg) {
  console.log("Connected")
})

socket.on("test", function(msg) {
  console.log("test msg recieved: " + msg)
})

window.onload = function() {
  this.socket.emit("test", "client test message")
}

var mockData = [{
    id: 1,
    title: "Frozen 2",
  }, {
    id: 2,
    title: "The Land before Time",
  }, {
    id: 3,
    title: "Monsters Inc",
  }, {
    id: 4,
    title: "The Adventures of Rick and Morty",
  }
]
