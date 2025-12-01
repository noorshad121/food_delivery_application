import express from "express"
import { addToCart, removeToCart,getToCart } from "../controllers/cartController.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const cartRouter = express.Router()


cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware, removeToCart);
cartRouter.get("/get",authMiddleware,getToCart)


export default cartRouter;