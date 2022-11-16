const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: [
        {
          product: {type: mongoose.Schema.Types.ObjectId ,ref:"product"},
          quantity: Number,
          name: String,
          price: Number
        }
      ],
      modifiedOn: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("cart", CartSchema);