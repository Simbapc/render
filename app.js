const express = require("express");
const app = express();
var morgan = require("morgan");

const port = process.env.PORT || 3001;

app.use(express.json());

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);

app.use(express.static("build"));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17: 30: 31.098Z",
    important: false,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18: 39: 34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
  {
    content: "ren",
    date: "2023-01-14T08:19:31.540Z",
    important: false,
    id: 4,
  },
  {
    content: "xinbo",
    date: "2023-01-14T11:44:48.357Z",
    important: true,
    id: 5,
  },
  {
    content: "xiaomingzi",
    date: "2023-01-14T13:13:18.270Z",
    important: false,
    id: 6,
  },
];

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(port, () => console.log(`Server running on port ${port}!`));
