import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const List = ({url}) => {
 
  const [list,setList]=useState([]);
  const fetchList=async()=>{
    const respones=await axios.get(`${url}/api/food/list`)
    console.log(respones.data)
    if(respones.data.success  )
    {
      setList(respones.data.fooditems);
    }
    else{
      setList([]);
      toast.error("Error")
    }
  }
  const removedfood=async(foodid)=>
  {
    const respones=await axios.post(`${url}/api/food/remove`,{id:foodid})
     await fetchList();
    if(respones.data.success)
    {
      toast.success(respones.data.message)
    }
    else{
      toast.error("Error");
    }
  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b> 
        <b>Category</b>
        <b>Price</b> 
        <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p> 
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='curser' onClick={()=>removedfood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
