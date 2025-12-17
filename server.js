import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// DB & services
connectDB();
connectCloudinary();

// ✅ ALLOWED ORIGINS (ALL YOUR FRONTENDS)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",

  "https://teezostore.com",
  "https://www.teezostore.com",

  "https://teezostore.vercel.app",
  "https://teezo-admin1.vercel.app"
];

// ✅ CORRECT CORS SETUP
app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ✅ MUST handle preflight
app.options("*", cors());

// middlewares
app.use(express.json());

// routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// test route
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () =>
  console.log("Server started on PORT :", port)
);
