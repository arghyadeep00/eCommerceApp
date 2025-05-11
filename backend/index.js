import express from "express";
import "dotenv/config";
import conn from "./config/conn.js";
import cors from "cors";

import userRouter from "./router/user.route.js";
import cookieParser from "cookie-parser";
import adminRouter from "./router/admin.route.js";

const app = express();
const port = process.env.PORT || 4002;

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
conn();

// app.use("/api", wishlistRouter);
// app.use("/api/admin", router);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use('/api',userRouter)

app.listen(port, () => {
  console.log(`Server listen on port number ${port}`);
});
