import Food from "../models/foodSchema.js";

const getFoodItems = async (req, res) => {
  try {
    const foodData = await Food.find({});
    if (foodData) {
      res.status(200).json({
        success: true,
        message: "food items get",
        response: foodData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "food item not get",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "food item fetching error",
    });
  }
};

export {getFoodItems}