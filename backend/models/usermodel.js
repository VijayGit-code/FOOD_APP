import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}

},{minimize:false})

const usemodel=mongoose.models.user || mongoose.model("user",userSchema);

export default usemodel;
//2806382712