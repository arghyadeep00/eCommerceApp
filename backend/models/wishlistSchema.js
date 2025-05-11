import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
  foodIds: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const wishlistschema =
  mongoose.models.wishlist || mongoose.model("wishlistschema", wishlistSchema);
export default wishlistschema;
