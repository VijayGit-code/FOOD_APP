import usemodel from "../models/userModel.js";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt"
import validator from "validator";

//login user
const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await usemodel.findOne({email});
        if(!user)
        {
            return res.json({success:false,message:"User Does not exists"});
        }
        const ispassword=await bcrypt.compare(password,user.password);//comparing password  database password and entered password
        if(!ispassword)
        {
            return res.json({success:false,message:"Invalid Password enter valid password"});
        }
        const token=createToken(user._id)
        res.json({success:true,token})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Login Failed"})

    }



}

const createToken=(id)=>{
    return jwt.sign({userId: id },process.env.JWT_SECRET)
}
//register user

const registerUser=async(req,res)=>{
    const{name,password,email}=req.body;
    try{//check is user already exists
        const exists=await usemodel.findOne({email});
        if(exists)
        {
            return res.json({success:false,message:"User already exists"});
        }
        //validating  email format and strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please Enter Valid email"})
        }
        if(password.length<8)
        {
            return res.json({success:false,message:"Please Enter a  strong password"})
        }
        //encrypting password
        const salt=await bcrypt.genSalt(10)
        const hashpassword=await bcrypt.hash(password,salt);
        const newUser=new usemodel({
            name:name,
            email:email,
            password:hashpassword
        })
        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({success:true,token})


    }catch(error){
        console.log(error)
        res.json({success:false,message:"Registeration Failed"})

    }

}
export {loginUser,registerUser};