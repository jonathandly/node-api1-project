const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");
const port = 3399;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/api/users", (req, res) => {
  db.find()
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({ error: "The users info cannot be located." });
    });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with this ID doesn't exist." });
      } else {
        res.json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The user info cannot be located." });
    });
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "PLease provide a name and bio for the user." });
  } else {
    db.insert(user)
      .then((newUser) => {
        res.status(201).json(newUser);
        res.send(newUser);
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the user to the db.",
        });
      });
  }
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.update(id, { name, bio }).then((res) => {
    res;
  });
  db.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with that ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "The user info could not be modified." });
    });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with that ID does not exist." });
      } else {
        res.json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The user could not be removed." });
    });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
