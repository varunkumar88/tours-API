const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reserveSchema = new Schema(
          {
            name: {
            type: String,
            maxlength: 50
        },
        date: {
            type: String
        },
        time: {
            type: Number,
            default: 0900
        },
        pickUpLocation: {
            type: String,
        },
        destination: {
            type: String,
            
        },
        
}
);

const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = Reserve;