import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
});

export default mongoose.model("Product", productSchema);