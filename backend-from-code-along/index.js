const express = require('express');
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const Mercury = require('@postlight/mercury-parser');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://localhost");

const Bookmarks = {
  getAll(callback) {
    const db = client.db("bookmarks");
    const collection = db.collection("bookmarks");

    collection.find({}).toArray(callback);
  },

  async create(link, callback) {
    const db = client.db("bookmarks");
    const collection = db.collection("bookmarks");

    const page = await Mercury.parse(link);

    const bookmark = {
      link: link,
      title: page.title,
      content: page.content
    };

    collection.insertOne(bookmark, callback);
  },

  destroy(bookmarkId, callback) {
    const db = client.db("bookmarks");
    const collection = db.collection("bookmarks");

    collection.deleteOne({
      _id: new ObjectId(bookmarkId)
    }, callback);
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/bookmarks', (req, res) => {
  Bookmarks.getAll((err, bookmarks) => {
    if (err) {
      res.send("error!");
      return;
    }

    res.send(JSON.stringify(bookmarks));
  });
});

app.post('/bookmarks', (req, res) => {
  Bookmarks.create(req.body.link, (err) => {
    if (err) {
      res.send({error: true});
      return;
    }

    res.send({success: true});
  });
});

app.delete('/bookmarks/:bookmarkId', (req, res) => {
  Bookmarks.destroy(req.params.bookmarkId, (err) => {
    if (err) {
      res.send({error: true});
      return;
    }

    res.send({success: true});
  });
});

async function start() {
  await client.connect();

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

start();
