const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const {type, data} = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    setTimeout(() => {
      axios.post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {...data, status}
      })
        .catch(error => console.error(error));
    }, 10000);
  }

  res.status(204);
})

app.listen(4003, () => console.log("App listening on port 4003"));