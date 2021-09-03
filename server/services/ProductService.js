const express = require("express");
const recordRoutes = express.Router();
const dbo = require("./connection");
let Product = require("../models/product");

// This section will help you create a new record.
recordRoutes.route("/api/products").post(function (req, res) {

    let myobj = {
        "_id": "10a08dbf-6901-4c9f-a856-9ac0084f4765",
        "createdAt": new Date("2021-03-30T08:00:30.859+00:00"),
        "updatedAt": new Date("2021-03-30T08:00:30.859+00:00"),
        "name": "Product 1",
        "price": 100.00,
        "image": "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg",
        "tags": ["tag1", "tag2"]
    };
    var db = dbo.getDB();
    db.collection("Products").insertOne(myobj, function (err, apiResponse) {
      if (err) throw err;
      var result = new Product(myobj);
      res.status(201).json({"data": result});
    });

  });

  module.exports = recordRoutes;