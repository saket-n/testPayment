var MongoClient = require('mongodb').MongoClient;
const config = require("./config")
var url = "mongodb://localhost:27017/";
var db;

MongoClient.connect(config.mongodb.url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  function (err, client) {
    if (err) throw err;
    db = client.db(config.mongodb.database);
    console.log("Connected to database")
  });


module.exports.insertOrder = function (doc, callback) {
 
  doc.insertedAt = new Date();

  db.collection("orders").insertOne(doc, function (err, res) {

    if (err) {
      console.log("Unable to insert to the database", orderDetails, err)
      // throw err;
    }
    callback();

  });
}