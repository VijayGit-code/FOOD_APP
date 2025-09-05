import express from "express"; 
import authmiddle from "../middlewares/authenticateemiddleware.js";
import { listorders, placeOrder, userOrders, verifyoder,updateStatus } from "../controller/oderController.js";   
const orderrouter=express.Router();
orderrouter.post("/place",authmiddle,placeOrder);
orderrouter.post("/verify",verifyoder)
orderrouter.post("/useroders",authmiddle,userOrders)
orderrouter.get("/list",listorders)
orderrouter.post("/status",updateStatus)
export default orderrouter;