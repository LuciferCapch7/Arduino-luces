const path = require("path");
const express = require("express");
const app = express();

//setting
app.set("port", 3000);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.log("Conecting... Port", app.get("port"));
});

const socketIo = require("socket.io");
const io = socketIo(server);
//estableciendo conexion

const firmata = require("firmata");
const Board = new firmata("COM3");

Board.on("ready", () => {
  io.on("connection", socket => {
    socket.on("turnOn", () => {
      Board.pinMode(13, Board.MODES.OUTPUT);
      Board.digitalWrite(13, Board.HIGH);
    });
    socket.on("turnOff", socket => {
      Board.pinMode(13, Board.MODES.OUTPUT);
      Board.digitalWrite(13, Board.LOW);
    });
  });
});
