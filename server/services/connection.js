const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var dbo;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        dbo = db.db("test-shopping");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
      });
  },
  getDB: function() {
    return dbo;
  }
};

