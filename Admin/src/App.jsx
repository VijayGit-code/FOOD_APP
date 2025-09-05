import React from 'react' 
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Oders from './pages/Oders/Oders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
    const url="https://food-app-backend-bzfm.onrender.com"
  return (
    <div> 
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>
          <Route path='/orders' element={<Oders url={url}/>}></Route>
        </Routes>
      </div>
      
    </div>
  )
}

export default App
