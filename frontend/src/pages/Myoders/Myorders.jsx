import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets'; 
import './MyOrder.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Myorders = () => {
    const {url,token}=useContext(StoreContext)
    const [data,setData]=useState([]);
    const fetchorders=async()=>{
        const res=await axios.post(url+"/api/order/useroders",{},{headers:{token}});
        setData(res.data.data);
        if(res.data.success)
        {
        toast.success(res.data.message)
        }
        else{
            toast.error(response.data.message)
        }
        console.log(res.data.data)
    }
    useEffect(()=>{
        if(token)
        {
            fetchorders();
        }

    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                    return(
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                                if(index===order.items.length-1)
                                {
                                    return item.name+" X "+ item.quantity
                                }
                                else{
                                    return item.name+" X "+ item.quantity
                                }
                            })}</p>
                            <p>${order.amount}</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchorders}>Track Order</button>

                        </div>
                    )
                })
            }
        </div>
      
    </div>
  )
}

export default Myorders
