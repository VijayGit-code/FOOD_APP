import React from 'react'
import './Oders.css'
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
const Oders = ({url}) => {
  const [orders,setOrders]=useState([]);
  const fetchAllOrders=async()=>{
  const respones = await axios.get(url + "/api/order/list");

    if(respones.data.success)
    {
      setOrders(respones.data.data);
      console.log(respones.data.data);
      
    }
    else{
      toast.error("Error")

    }

  }
  const statusHandler=async(event,orderId)=>{ 
    const respones=await axios.post(url+"/api/order/status",{orderId,status:event.target.value})
    if(respones.data.success)
    {
      await fetchAllOrders();
    }

  }
  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
  <div className='order add'>
    <h3>Order Page</h3>
    <div className="order-list">
      {orders.map((order, index) => {
        return (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, i) => (
                  i === order.items.length - 1
                    ? `${item.name} X ${item.quantity}`
                    : `${item.name} X ${item.quantity}, `
                ))}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.street},{order.address.city},{order.address.state},{order.address.country},{order.address.zipcode}
                </p>
              </div>
              <p  className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Delivered">Food Delivered</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )
      })}
    </div>
  </div>
)

}

export default Oders
