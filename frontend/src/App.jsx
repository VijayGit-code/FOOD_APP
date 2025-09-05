import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar' 
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Placeorder from './pages/placeorder/Placeorder'
import Cart from './pages/cart/Cart'
import Fooder from './components/Footer/Footer'
import Logginpop from './components/Logginpop/Logginpop'
import Verify from './pages/verify/verify'
import Myorders from './pages/Myoders/Myorders'
 
 
const App = () => {
  const[showLogin,setShowLogin]=useState(false)
  return (
     <>
     {showLogin?<Logginpop setShowLogin={setShowLogin}/>:<></>}
     <div className='app'>
      <Navbar setShowLogin={setShowLogin}/> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
        <Route path='/verify' element={<Verify/>}/> 
        <Route path='/myorders' element={<Myorders/>}/> 
      </Routes>
    </div>
    <Fooder/>
    </>
  )
}

export default App
