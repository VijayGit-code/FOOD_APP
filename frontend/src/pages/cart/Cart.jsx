import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext' 
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const{ cartitems,food_list,removefromcart,getTotalamount,url}=useContext(StoreContext)
  const navigate=useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
      <hr />
      {food_list.map((item)=>{ 

        if(cartitems[item._id]>0)
        {
          return (
            <div key={item._id}>
              <div className="cart-items-title cart-items-item">
            <img src={url+"/images/"+item.image} alt="" />
            <p>{item.name}</p> 
            <p>${item.price}</p>
            <p>{cartitems[item._id]}</p>
            <p>${item.price * cartitems[item._id]}</p>
            <p onClick={()=>removefromcart(item._id)} className='cross'>X</p>
          </div>
          <hr />
            </div>
          )
        }
      })}
      </div>
      <div className='cartbottom'>
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
          <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code ,Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='enter promo code' />
              <button>submit</button>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
