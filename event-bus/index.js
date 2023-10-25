const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event)
    .catch(error => console.error(error));
  axios.post("http://comments-srv:4001/events", event)
    .catch(error => console.error(error));
  axios.post("http://query-srv:4002/events", event)
    .catch(error => console.error(error));
  axios.post("http://moderation-srv:4003/events", event)
    .catch(error => console.error(error));

  console.log("Event received", event.type);

  res.send({status: "OK"});
})

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log("Listening on port 4005"));