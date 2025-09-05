import axios from "axios";
import { createContext, useEffect, useState } from "react";  
export const StoreContext=createContext(null)
const StoreContextProvider=(props)=>{
    const[cartitems,setcartitems]=useState({});
    const url="http://localhost:4000"
    const [token,Settoken]=useState("");
    const[food_list,Setfoodlist]=useState([])
    const addTocart=async (itemId)=>{
        if(!cartitems[ itemId]){//if the item not avaliable in cart the we add to cart 
            setcartitems((prev)=>({...prev,[ itemId]:1}))
        }
        else{//if the item already avaliable in cart then we just inncearses the quantity number
            setcartitems((prev)=>({...prev,[ itemId]:prev[ itemId]+1}))

        }   
        if(token)
        {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removefromcart=async( itemId)=>{
        setcartitems((prev)=>({...prev,[ itemId]:prev[ itemId]-1}))
        if(token)
        {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})//removing item from cart
        }

    } 
    const getTotalamount=()=>{
        let totalAmount=0;
    for(const item in cartitems) {
        if(cartitems[item]>0) {
            let iteminfo = food_list.find((product)=>product._id === item) // ✅ use _id
            if(iteminfo) {
                totalAmount += iteminfo.price * cartitems[item];
            }
        }
    }
        return totalAmount;
    }

    useEffect(()=>{
        let savetoken=localStorage.getItem("token")
        if(savetoken)
        {
            console.log(savetoken)
            Settoken(savetoken)
        }
    },[])
    const fetchfoodlist=async()=>{
        const respones=await axios.get(url+"/api/food/list");
        Setfoodlist(respones.data.fooditems);
    }
    const loadcartdata=async(token)=>{
        const respones=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        
            setcartitems(respones.data.cartData);
            
    }
    useEffect(()=>{
         
        async function fetchdata(){
            await fetchfoodlist(); 
            const savedtoken = localStorage.getItem("token");
    if (savedtoken) {
      Settoken(savedtoken);
      await loadcartdata(savedtoken);
    }
  }
  fetchdata(); 
    },[])
    const contextValue={
        food_list,  
        cartitems,
        setcartitems,
        addTocart,
        removefromcart,
        getTotalamount,
        url,
        token,
        Settoken
         

    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;