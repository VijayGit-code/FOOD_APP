import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Appdownloader from '../../components/Appdownloader/Appdownloader'
import Cart from '../cart/Cart'
const Home = () => {
  const[category,Setcategory]=useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} Setcategory={Setcategory}/>
      <FoodDisplay category={category}/> 
      <Appdownloader/> 
      
    </div>
  )
}

export default Home
