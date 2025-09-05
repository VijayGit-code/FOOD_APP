import React from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
const FoodItem = ({id,name,price,description,image}) => {
  const{cartitems, addTocart,removefromcart,url}=useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="fooditem-img-container">
        <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {!cartitems[id]
            ?<img  className='add' onClick={()=>addTocart(id)} src={assets.add_icon_white} alt=''/>
            :<div className='food-item-counter'>
              <img onClick={()=>removefromcart(id)}  src={assets.remove_icon_red} alt=''/>
              <p>{cartitems[id]}</p>
              <img onClick={()=>addTocart(id)}  src={assets.add_icon_green} alt="" />
            </div>
            }
        </div>
        <div className="fod-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
      
    </div>
  )
}

export default FoodItem
