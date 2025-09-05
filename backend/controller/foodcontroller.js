import foodmodel from "../models/foodmodel.js";
import fs from "fs";

//add food item
const addFood=async(req,res)=>{
    let image_filename= `${req.file.filename}`;
    const food= new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price, 
        category:req.body.category, 
        image:image_filename
    })
     try{
        await food.save().then(()=>{
        res.status(201).json({success:true,message:"Food item added successfully"})
    })
    } catch(error){
        console.log(error)
        res.status(400).json({success:false,message:"Food item Failed to add"})
     }

}
const listedfood=async(req,res)=>{
    try{
        const fooditems= await foodmodel.find({})
        res.status(200).json({success:true,fooditems:fooditems})
    }catch(error){
        console.log(error)
        res.status(400).json({success:false,message:"Failed to fetch food items"})
    }

}
const removefood=async(req,res)=>{
    try{
        const food=await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodmodel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true,message:"Food item removed"})

    }
    catch(error){
        res.status(400).json({success:false,message:"Failed to remove food item"})

    }

}
export {addFood,listedfood,removefood}