const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.plugin((schema) => {
    schema.options.toJSON = {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    };
  });
  
let Product = new Schema({
    id: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
    tags: {
        type: Array
    }
});
module.exports = mongoose.model('Product', Product);