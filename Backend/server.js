import express from "express";
import env from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import  cartRouter  from "./routes/cartRoute.js";
env.config({});

const app = express();
const PORT = process.env.PORT || 7000;

// middleware
app.use(express.json());
app.use(cors())
// DB connection
connectDB();

// root route
app.get("/", (req,res)=> {
    res.send("root route")
})

// food router api
app.use("/api/fbn", foodRouter)
app.use("/image", express.static('uploads'));
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)

// express connection
app.listen(PORT,()=> {
    console.log("app is listing on port", PORT)
})
