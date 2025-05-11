import wishlistschema from "../models/wishlistSchema.js";

const wishlist = async (req, res) => {
  const { foodIds } = req.body;
  console.log(req.user)
  const wishlistUser = new wishlistschema({
    foodIds,
    user: req.user,
  });
  await wishlistUser.save();
  res.send("ok");
};

export default wishlist;
