const express = require("express");
const recordRoutes = express.Router();
const dbo = require("./connection");
let Product = require("../models/product");


// CHALLENGE 1
recordRoutes.post("/api/products",function (req, res) {
    var db = dbo.getDB();
    if (!req.body.id) throw "Please input an Id";

    let paramid = {_id: req.body.id};
    delete req.body.id;
    req.body.createdAt = new Date(req.body.createdAt);
    req.body.updatedAt = new Date(req.body.updatedAt);
    let param = Object.assign(paramid, req.body);

    db.collection("Products").insertOne(param, function (err, apiResponse) {
      if (err) throw err;
      var result = new Product(Object.assign({id: paramid._id}, req.body));
      res.status(201).json({"data": result});
    });

  });

// CHALLENGE 2
recordRoutes.route("/api/products/:id").get(function (req, res) {
    var db = dbo.getDB();
    if (!req.params.id) throw "Please input an Id";

    let param = { _id: req.params.id };
    db.collection("Products").findOne(param).then(function(result) {
      result = new Product(Object.assign({id: param._id},result));
      res.status(200).json({"data": result});
    })    
  })

// CHALLENGE 3
recordRoutes.route("/api/products/:id").post(function (req, res) {
    var db = dbo.getDB();
    if (!req.body.id || !req.body.createdAt || !req.body.updatedAt || !req.body.name 
      || !req.body.price) throw "Please input Id, createdAt, updatedAt, name and price";

    let newvalues = {
      $set: {
        "createdAt": new Date(req.body.createdAt),
        "updatedAt": new Date(req.body.updatedAt),
        "name": req.body.name,
        "description": req.body.description,
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
    if (!req.params.id) throw "Please input an Id";

    var param = { _id: req.params.id };
    db.collection("Products").deleteOne(param, function (err, obj) {
      if (err) throw err;
      res.status(200).json({"data": {id: param._id}});
    });
  });

  module.exports = recordRoutes;