import React from 'react'
import './Appdownloader.css'
import { assets } from '../../assets/assets'
const Appdownloader = () => {
  return (
    <div className='app-downloader' id='app-downloader'>
        <p>For Better Experience Download <br/>Tomato App</p>
        <div className="app-downloader-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}

export default Appdownloader
