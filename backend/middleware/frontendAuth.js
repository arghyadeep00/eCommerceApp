// backend/routes/user.js
import express from "express";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.get("/auth-check", authorize, (req, res) => {
  res.status(200).json({ success: true });
});

export default router;
