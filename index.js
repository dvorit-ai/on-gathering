// const port = 22554;
const port = 3000;
var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);

var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

http.listen(port, function () {
  console.log("listening on *:" + port);
});

io.on("connection", (socket) => {
  // Send the updated count to all clients when a new user connects
  io.emit("count", io.engine.clientsCount);

  // When a user disconnects, update all clients
  socket.on("disconnect", () => {
    io.emit("count", io.engine.clientsCount);
  });

  // testing heart click
  socket.on("heart_clicked", () => {
    io.emit("heart_clicked"); // Broadcast to all clients
  });
});
