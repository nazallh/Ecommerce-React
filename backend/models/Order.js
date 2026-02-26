const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],

    shipping: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay", "cod"],
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    transactionId: {
      type: String,
    },

    razorpayOrderId: {
      type: String,
    },

    orderStatus: {
      type: String,
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);