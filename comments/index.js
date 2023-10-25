const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] ?? []);
})

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const {id: postId} = req.params;

  const comments = commentsByPostId[postId] ?? [];

  comments.push({ id, content, status: "pending" })

  commentsByPostId[postId] = comments;

  axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {id, content, status: "pending", postId}
  })

  res.status(201).send(comments);
})

app.post("/events", (req, res) => {
  const {type, data} = req.body;

  if (type === "CommentModerated") {
    const {postId, id, status, content} = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find(c => c.id === id);
    comment.status = status;

    axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {id, status, postId, content}
    })
  }

  res.status(204);
})

app.listen(4001, () => {
  console.log("Listening on port 4001");
});