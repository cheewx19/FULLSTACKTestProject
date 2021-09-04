const { gql } = require("apollo-server-express");
const { ApolloServer } = require("apollo-server-express");
var mongoose = require('mongoose');
let Product = require("../models/product");

const typeDefs = gql`
    type Product {
        id: String
        createdAt: String
        updateAt: String
        name: String
        price: Float
        description: String
        image: String
        tags: [String]
    },
    type Query {
        getProduct(id:String):Product
    },
    input ProductInput {
        id: String
        createdAt: String
        updateAt: String
        name: String
        price: Float
        description: String
        image: String
        tags: [String]
    },
    input IdInput {
        id: String
    },
    type Mutation {
        createProduct(input: ProductInput):Product
        updateProduct(input: ProductInput): Product
        deleteProduct(input: IdInput): Product
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
    Mutation: {
        createProduct: (root,{ input }) => {
            const newProduct=new Product({
                id : input.id,
                createdAt : input.createdAt,
                updatedAt : input.updatedAt,
                name : input.name,
                price : input.price,
                description : input.description,
                image:input.image,
                tags: input.tags
            });

            return new Promise((resolve,reject)=>{
                newProduct.save((err)=>{
                    if(err) reject(err);
                    else resolve(newProduct);
                })
            })
        },
        UpdateProduct: (root,{ input }) => {
            const newProduct=new Product({
                $set:{
                    id : input.id,
                    createdAt : input.createdAt,
                    updatedAt : input.updatedAt,
                    name : input.name,
                    price : input.price,
                    description : input.description,
                    image:input.image,
                    tags: input.tags
                }
            });

            return new Promise((resolve,reject)=>{
                newProduct.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)},
                newProduct,
                (err)=>{
                    if(err) reject(err);
                    else resolve(newProduct);
                })
            })
        },
        DeleteProduct: (root,{ input }) => {
            

            return new Promise((resolve,reject)=>{
                Product.findByIdAndDelete({_id: mongoose.Types.ObjectId(id)},(err, product)=>{
                    if(err) reject(err);
                    else resolve(product);
                })
            })
        },
    }
    
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;