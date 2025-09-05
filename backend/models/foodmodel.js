import mongoose from "mongoose";
const foodSchema=new mongoose.Schema({
    name:{type:String,required:true,},
    description:{type:String,required:true,},
    price:{type:Number,required:true,},
    image:{type:String,required:true,},
    category:{type:String,required:true,} 
    
})
const foodmodel=mongoose.model.food || mongoose.model("food",foodSchema) //if model is already present then use that otherwise create new model
export default foodmodel;