const { gql } = require("apollo-server-express");
const { ApolloServer } = require("apollo-server-express");
var mongoose = require('mongoose');
let Product = require("../models/product");

const typeDefs = gql`
    type Product {
        id: String,
        createdAt: String,
        updateAt: String,
        name: String,
        price: Float,
        description: String,
        image: String,
        tags: [String]
    },
    type Query {
        getProduct(id:String):Product
    },
    type Mutation {
        updateProduct(id: String!, updatedAt:String!, name:String!, price:Float!, 
        description:String, image: String, tags: [String]): Product
    }
`;

const resolvers ={
    Query:{
            getProduct:(root, {id})=>{
                console.log(id)
                return new Promise((resolve,reject)=>{
                    
                    Product.findOne({_id: mongoose.Types.ObjectId(id)},(err,product)=>{
                    if(err) reject(err);
                    else resolve(product);
                })
            })
        }
    },
    
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;