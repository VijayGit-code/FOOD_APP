import React from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../components/context/StoreContext' 
import { useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const Verify = () => {
    const[searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    console.log(success,orderId);
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();
    const verifyPayment=async()=>{
        const respones=await axios.post(url+"/api/order/verify",{success,orderId});
        if(respones.data.success)
        {
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[])
  return (
    <div className='verify'>
        <div className='spinner'>
        </div> 
    </div>
  )
}

export default Verify
