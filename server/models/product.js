const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.plugin((schema) => {
    schema.options.toJSON = {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
        if (ret.description == "")
            delete ret.description;
        if (ret.image == "")
            delete ret.image;
        if (ret.tags.length < 1)
            delete tags;
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
    description: {
        type: String
    },
    image: {
        type: String
    },
    tags: {
        type: Array
    }
});
module.exports = mongoose.model('Product', Product);