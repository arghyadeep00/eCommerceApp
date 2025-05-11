import { Router } from "express";
import multer from "multer";

const adminRouter = Router();

import {
  addFoodItems,
  getFoodItems,
  deleteFoodItems,
  updateFoodItems,
  userCartData,
} from "../controllers/admin.controller.js";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

adminRouter.post("/upload", upload.single("image"), addFoodItems);
adminRouter.get("/get-food-items", getFoodItems);
adminRouter.delete("/delete-item/:id", deleteFoodItems);
adminRouter.patch("/update-item/:id", updateFoodItems);

// =================== user cart data ====================== //

adminRouter.post("/cart-data", userCartData);

export default adminRouter;
