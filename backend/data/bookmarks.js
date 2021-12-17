const { ObjectId } = require("mongodb");
const Mercury = require("@postlight/mercury-parser");

const Bookmarks = {
  findAll(mongoClient, callback) {
    const db = mongoClient.db("bookmarks");

    db.collection("bookmarks").find({}).toArray(function(err, result) {
      callback(err, result);
    });
  },

  async create(mongoClient, link, callback) {
    const db = mongoClient.db("bookmarks");

    const page = await Mercury.parse(link);

    const bookmark = {
      link: link,
      title: page.title,
      content: page.content,
      image: page.lead_image_url,
      published: page.date_published,
      excerpt: page.excerpt
    }

    db.collection("bookmarks").insertOne(bookmark, function(err) {
      callback(err)
    });
  },

  destroy(mongoClient, id, callback) {
    const db = mongoClient.db("bookmarks");

    db.collection("bookmarks").deleteOne({ _id: new ObjectId(id) }, function(err) {
      console.log("Removed?", id, err)
      callback(err);
    })
  }
}

module.exports = Bookmarks;