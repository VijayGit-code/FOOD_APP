import React, {  useState } from 'react'
import './Add.css'
 import axios from "axios"
import { assets, url } from '../../assets/assets'
import { toast } from 'react-toastify'
 
const Add = ({url}) => { 
    const [image,Setimage]=useState(false);
    const[data,Setdata]=useState({
        name:" ",
        description:" ",
        price:" ",
        category:"Salad"
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        Setdata(data=>({...data,[name]:value}))
    }
    const onSubmitHandler=async(event)=>{
        event.preventDefault();
        const formdata=new FormData();
        formdata.append("name",data.name)
        formdata.append("description",data.description)
        formdata.append("price",Number(data.price))//convert number in backend
        formdata.append("category",data.category)
        formdata.append("image",image)
        const response= await axios.post(`${url}/api/food/add`,formdata)//formdata is send to backend
        if(response.data.success){//if it success means i want to add another data please reset the form
            Setdata({
                name:" ",
                description:" ",
                price:" ",
                category:"Salad"
            })
            Setimage(false)//reset image
            toast.success(response.data.message) 
        }else{ 
            toast.error(response.data.message)

        }

    }
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload">
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>Setimage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name'  placeholder='enter product'/>

            </div>
            <div className='add-product-description flex-col'>
                <p>product Description</p>
                <textarea onChange={onChangeHandler} value={data.description}  name="description" rows="6" placeholder='write decription'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} value={data.category}  name="category" >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodels">Noodels</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price}  type="Number" name="price" placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='add-button'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add
