import { Router } from "express";
import {
  userLogin,
  userRegister,
} from "../controllers/user.auth.controller.js";
import authorize from "../middleware/authorize.js";
import { getFoodItems } from "../controllers/user.controller.js";
const userRouter = Router();

// =========== auth routes =============== //
userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);

// =========== Data routes ===============  //
userRouter.get("/get-food-items", getFoodItems);

userRouter.get("/auth-check", authorize, (req, res) => {
  res.status(200).json({ success: true });
});

export default userRouter;
