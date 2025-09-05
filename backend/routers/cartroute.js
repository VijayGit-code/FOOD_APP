import express from 'express';
import { addtocart,removeFromcart,getcart } from '../controller/cartController.js';
import authmiddle from '../middlewares/authenticateemiddleware.js';
const cartrouter=express.Router();
cartrouter.post("/add",authmiddle,addtocart)
cartrouter.post("/remove",authmiddle,removeFromcart)
cartrouter.post("/get",authmiddle,getcart)
export default cartrouter;