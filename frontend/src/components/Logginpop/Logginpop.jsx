import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './Logginpop.css'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
const Logginpop = ({setShowLogin}) => {
    const {url,Settoken}=useContext(StoreContext)
    const[currState,setCurrState]=useState("Login")
    const[data,Setdata]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        Setdata(data=>({...data,[name]:value}))
    } 
    const onLogin=async(event)=>{ 
        event.preventDefault()
        let newurl=url;
        if(currState==='Login')
        {
            newurl+="/api/user/login"
        }
        else{
            newurl+="/api/user/register"
        }
        const respones= await axios.post(newurl,data);
        console.log(respones);
         if(respones.data.success)
         {
            localStorage.setItem("token",respones.data.token);
            if(Settoken(respones.data.token)){
                 
            Settoken(respones.data.token);
            //console.log(respones.data.token)
             
            setShowLogin(false);
        }
         }
        else{
            alert(respones.data.message)
        }

    }
  return (
    <div className="login-popup">
        <form action="" onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>: <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Name Bro' required />}
                 
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email Bro' required />
                <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password Bro'  required/>
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create account":"Loggin"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing i agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"
            ?<p>Create a new Account? <span onClick={()=>setCurrState("Sing Up")}>Click here</span> </p>
            :<p>Already have an account <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
             
             
        </form>
      
    </div>
  )
}

export default Logginpop
