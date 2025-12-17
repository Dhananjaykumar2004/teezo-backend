import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

import cors from "cors";

const corsOptions = {
  origin: [
    "http://localhost:5173",          // main frontend local
    "http://localhost:5174",          // admin local
    "https://teezostore.com",
    "https://www.teezostore.com",
    "https://teezostore.vercel.app",
    "https://teezo-admin1.vercel.app" // ✅ ADMIN PANEL (IMPORTANT)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));



app.use(express.json())
// routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})

app.listen(port, () => console.log('Server started on PORT : ' + port))
