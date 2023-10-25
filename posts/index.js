const express = require('express');
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id, title
  };

  axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: posts[id]
  })
    .catch(error => console.error(error));

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);
  res.status(204);
})

app.listen(4000, () => {
  console.log("v2");
  console.log("Listening on port 4000");
});