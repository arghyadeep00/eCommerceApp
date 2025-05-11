import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  country: {
    type: String,
  },
  password: {
    type: String,
  },
  //   wishlist: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "wishlist",
  //   },
});

export const user = mongoose.model("user", userSchema);
