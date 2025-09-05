import usemodel from "../models/userModel.js";

//add item to cart
const addtocart=async(req,res)=>{
     try {
    let userdata = await usemodel.findById(req.userId);

    if (!userdata) {
        return res.json({ success: false, message: "User not found" });
    }

    let cartData = userdata.cartData || {};   // ✅ safe default

    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
    } else {
        cartData[req.body.itemId] += 1;
    }

    await usemodel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });

} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
}


}

//remove item from user cart
const removeFromcart=async(req,res)=>{
     try {
    let userdata = await usemodel.findById(req.userId);

    if (!userdata) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = await userdata.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    } else {
      return res.json({ success: false, message: "Item not in cart" });
    }

    await usemodel.findByIdAndUpdate(req.userId, { cartData });
    return res.json({ success: true, message: "Successfully removed" });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Occured" });
  }

}


//fetch user data

const getcart=async(req,res)=>{
    try {
        let userdata=await usemodel.findById(req.userId);
        let cartData=await userdata.cartData ||{};
        res.json({success:true,cartData});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Occured"});
        
        
    }

}
export {addtocart,removeFromcart,getcart}


//selecting multiple words at a time ctl+shift+L