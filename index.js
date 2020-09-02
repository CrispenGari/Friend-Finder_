const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 8000 || process.env.PORT;
const host = "localhost" || "127.0.0.1";

const locationMap = new Map();
const usernameMap = new Map();

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("hello Maps!!");
});
io.on("connection", (socket) => {
  console.log("we have a new connection of socket id: " + socket.id);
  socket.on("updateLocation", (data) => {
    locationMap.set(socket.id, data);
  });

  socket.on("requestLocation", () => {
    socket.emit("locationUpdate", Array.from(locationMap));
  });
  socket.on("disconnect", () => {
    locationMap.delete(socket.id);
  });
});

http.listen(port, host, (error) => {
  if (error) {
    throw error;
  }
  console.log("The server has started at port: " + port);
});
