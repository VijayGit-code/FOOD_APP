import jwt from "jsonwebtoken"

const authmiddle=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)//decode the token with this text only because we encrypt using this text only
        req.userId=token_decode.userId;
        next();
    }

    catch(error){
        console.log(error);
        res.json({success:false,message:"fail"})
        

    }

}
export default authmiddle;