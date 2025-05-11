import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Chips", "Juice", "Snacks", "Spices", "Sauces"],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
  },
  image: [
    {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
      _id: false,
    },
  ],
  rating: {
    type: Number,
  },
  about: {
    type: String,
  },
  daydeal: {
    type: Boolean,
  },
  newarrive:{
    type:Boolean
  }
});

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default Food;
