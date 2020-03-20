
var socket = io();

socket.on("connect", function(msg) {
  console.log("Connected")
})

socket.on("test", function(msg) {
  console.log("test msg recieved: " + msg)
})

window.onload = function() {
  this.socket.emit("test", "client test message")

  let buttonHost = this.document.getElementById("hostRoom")
  buttonHost.addEventListener("click", function(ev) {
    hideErrors()
    let username = getUserName()
    if(!username) {
      document.getElementById("hostNoUser").style.visibility = "visible"
      ev.preventDefault()
    }
  })

  let buttonJoin = this.document.getElementById("joinRoom")
  buttonJoin.addEventListener("click", function(ev) {
    hideErrors()
    let username = getUserName()
    let roomcode = document.getElementById("roomCode").value
    document.getElementById("joinNoUser").style.visibility = !username ? "visible" : "hidden"
    document.getElementById("joinNoRoom").style.visibility = !roomcode ? "visible" : "hidden"

    if(!username || !roomcode) {
      ev.preventDefault()
      return
    }
  })
}

function getUserName() {
  return document.getElementById("username").value;
}

function hideErrors() {
  let errors = document.getElementsByClassName("error");
  for(let i = 0; i < errors.length; i++) {
    errors[i].style.visibility = "hidden";
  }
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
