const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
          {
            name: {
            type: String,
            maxlength: 50
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            default: 50
        },
        image: {
            type: String,
        },
        currency: {
            type: String,
            default: "EUR"
        },
        
}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;