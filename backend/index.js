const express = require('express');
const { MongoClient } = require("mongodb");
const Bookmarks = require("./data/bookmarks.js");
const cors = require('cors');

const port = 3003;

const mongoUri = "mongodb://localhost";
const client = new MongoClient(mongoUri);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.get('/bookmarks', (req, res) => {
  Bookmarks.findAll(client, (err, bookmarks) => {
    if (err) {
      res.send("Error!")
      return;
    }
    res.json(bookmarks);
  });
});

app.post('/bookmarks', (req, res) => {
  console.log("req.body:", req.body);
  Bookmarks.create(client, req.body.link, (err) => {
    if (err) {
      res.json({
        error: true,
        message: err
      })
      return;
    }
    res.json({ok: true});
  });
});

app.delete('/bookmarks/:bookmarkId', (req, res) => {
  Bookmarks.destroy(client, req.params.bookmarkId, (err) => {
    if (err) {
      res.json({
        error: true,
        message: err
      })
      return;
    }
    res.json({ok: true});
  });
});

async function start() {
  await client.connect();

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
}

start();