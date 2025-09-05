import orderModel from "../models/Ordersmodel.js";
import userModel from "../models/usermodel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!userId||!items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // clear cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Stripe line_items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100*83), // rupees → paise
      },
      quantity: item.quantity,
    }));

    // Add delivery charge (₹20)
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2000, // 20 INR = 2000 paise
      },
      quantity: 1,
    });

    // Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items, // ✅ plural
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Stripe Error:", error.message);
    res.json({ success: false, message: "Error while placing order" });
  }
//   console.log("Decoded UserId from token:", req.userId);
// console.log("Request body:", req.body);

};
const verifyoder=async(req,res)=>{
  const {success,orderId}=req.body;
  try {
    if(success=="true")
    {
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      res.json({success:true,message:"Order placed successfully"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false,message:"Order failed,Please try again"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error while verifying order"})
    
    
  }
}
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const orders = await orderModel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while fetching user orders" });
  }
};
const listorders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

//update status

const updateStatus=async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
    
  }

}

export { placeOrder, verifyoder, userOrders ,listorders,updateStatus};

