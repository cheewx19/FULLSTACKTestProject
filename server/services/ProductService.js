const express = require("express");
const recordRoutes = express.Router();
const dbo = require("./connection");
let Product = require("../models/product");


// CHALLENGE 1
recordRoutes.route("/api/products").post(function (req, res) {
    var db = dbo.getDB();
    let paramid = {_id: req.body.id};
    delete req.body.id;
    let param = Object.assign(paramid, req.body)
    console.log(param)
    db.collection("Products").insertOne(param, function (err, apiResponse) {
      if (err) throw err;
      var result = new Product(Object.assign({id: paramid._id}, req.body));
      res.status(201).json({"data": result});
    });

  });

// CHALLENGE 2
recordRoutes.route("/api/products/:id").get(function (req, res) {
    var db = dbo.getDB();
    let param = { _id: req.params.id };
    db.collection("Products").findOne(param).then(function(result) {
      result = new Product(Object.assign({id: param._id},result));
      res.status(200).json({"data": result});
    })    
  })

// CHALLENGE 3
recordRoutes.route("/api/products/:id").post(function (req, res) {
    var db = dbo.getDB();
    let newvalues = {
      $set: {
        "createdAt": new Date(req.body.createdAt),
        "updatedAt": new Date(req.body.updatedAt),
        "name": req.body.name,
        "price": req.body.price,
        "image": req.body.image,
        "tags": req.body.tags,
      },
    };
    let param = {_id: req.params.id};
    db.collection("Products").updateOne(param, newvalues, function (err, apiResponse) {
      if (err) throw err;

      var result = new Product(Object.assign({id: param._id}, req.body));
      res.status(200).json({"data": result});
    });

  });
// CHALLENGE 4
recordRoutes.route("/api/products/:id").delete((req, res) => {
    var db = dbo.getDB();
    var param = { _id: req.params.id };
    db.collection("Products").deleteOne(param, function (err, obj) {
      if (err) throw err;
      res.status(200).json({"data": {id: param._id}});
    });
  });

  module.exports = recordRoutes;