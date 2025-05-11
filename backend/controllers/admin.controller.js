import cloudinary from "../config/cloudinary.js";
import Food from "../models/foodSchema.js";
const addFoodItems = async (req, res) => {
  try {
    const imageUrl = await cloudinary.uploader.upload(
      req.file.path,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "image not upload",
          });
        }
      }
    );
    const {
      category,
      description,
      price,
      actualPrice,
      details,
      rating,
      about,
    } = req.body;
    const data = await Food.create({
      category,
      description,
      price,
      actualPrice,
      details,
      image: [{ url: imageUrl.secure_url, publicId: imageUrl.public_id }],
      rating,
      about,
    });
    if (data) {
      res.status(201).json({
        success: true,
        message: "Food item added successfully",
        data: data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Food item added failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while adding food details",
      error: error.message,
    });
  }
};

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
const deleteFoodItems = async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemDelete = await Food.findByIdAndDelete(itemId);
    const imageDestroy = await cloudinary.uploader.destroy(
      itemDelete.image[0].publicId
    );
    if (imageDestroy.result == "ok") {
      res.status(200).json({
        success: true,
        message: "item deleted",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "item not delete",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "server error",
    });
  }
};

const updateFoodItems = async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;
  try {
    const updateItems = await Food.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!updateItems) {
      res.status(400).json({
        success: false,
        message: "Item not updated",
      });
    }
    res.status(200).json({
      success: true,
      message: "item update successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const userCartData = (req, res) => {
  try {
    const cartData = req.body;
    const token = req.cookies.token;
    console.log(token)
    console.log(cartData)
    res.status(201).json({
      success: true,
      message: "Cart item recived",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Item not recived",
    });
  }
};

export {
  addFoodItems,
  getFoodItems,
  deleteFoodItems,
  updateFoodItems,
  userCartData,
};
