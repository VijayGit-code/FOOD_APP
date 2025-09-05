import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Placeorder = () => {  
  const{getTotalamount,token,food_list,cartitems,url}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))

  } 
  const placeOrder=async(event)=>{
    event.preventDefault();
    let oderItems=[];
    food_list.map((item)=>{
      if(cartitems[item._id]>0){
        let iteminfo=item;
        iteminfo['quantity']=cartitems[item._id];
        oderItems.push(iteminfo)
      }
    }) 
    let orderData={  
      address:data,
      items:oderItems,
      amount:getTotalamount()===0?0:getTotalamount()+2
    }
    let res=await axios.post(`${url}/api/order/place`,orderData,{headers:{token,'Content-Type': 'application/json',}});
    if(res.data.success)
    {
      const{session_url}=res.data;
      window.location.replace(session_url);
    }
    else{
      console.log(res.data);
      
      alert("Order failed! Please try again.")
    }
  }
  const navigate=useNavigate();
    useEffect(()=>{
      if(!token)
      {
        navigate('/cart')
      }
      else if(getTotalamount()===0){
        navigate('/cart')

      }

    },[token])
  return (
    <form onSubmit={placeOrder}  className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-feilds">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-feilds">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-feilds">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />

      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalamount()}</p>
            </div>
            <hr />
             <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalamount()===0?0:2}</p>

            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalamount()===0?0:getTotalamount()+2}</p>

            </div>
          </div>
          <button type='submit' >Proceed to PAYMENT</button>
        </div>

      </div>
    </form>
  )
}

export default Placeorder
