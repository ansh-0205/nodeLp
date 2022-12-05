const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      products: [
        {
          _id:false,
          product: {type: mongoose.Schema.Types.ObjectId ,ref:'product'},
          quantity: Number,
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