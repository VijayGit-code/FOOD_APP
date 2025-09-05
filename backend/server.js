import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodrouter from "./routers/foodroute.js"
import userrouter from "./routers/userroute.js"
import cartrouter from "./routers/cartroute.js"
import orderrouter from "./routers/Oderrouter.js"
import dotenv from "dotenv";
dotenv.config();
const app=express()
const port=process.env.PORT || 4000
//middleware
app.use(express.json())
app.use(cors())
//DB connection
connectDB();
//api end point
app.use("/api/food",foodrouter)
app.use('/images', express.static('uploads')); //to access image from frontend
app.use("/api/user/",userrouter)
app.use("/api/cart",cartrouter)
app.use("/api/order",orderrouter)
app.get("/",(req,res)=>{
    res.send("API working",cartrouter)

})
app.listen(port,()=>{
    console.log(`Server start at http://localhost:${port}`)
})
