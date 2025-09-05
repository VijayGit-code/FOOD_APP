import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://FOODYAPP:FOOD2209010125app@cluster0.h5vtm7e.mongodb.net/food-delivery').then(()=>{console.log("Mongodb connected")})
} 