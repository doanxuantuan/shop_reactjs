import React, { useState } from 'react'
import './CSS/LoginSignup.css'
export const LoginSignup = () => {
  const [state,setState]=useState("Sign up")
  const [formData,setformData]=useState({
    username:"",
    password:"",
    email:""  
  })

  const changeHandle=(e)=>{
      setformData({...formData,[e.target.name]:e.target.value})
  }
  const login =async()=>{    
    let resData;  
    console.log("Login thôi",formData)
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>resData=data)
    if(resData.success){
      localStorage.setItem('auth-token',resData.token);
      window.location.replace("/");
    }
    else{
      alert(resData.errors)
    }
  }
  const signup =async()=>{
    let resData;  

    console.log("Sign up nào",formData)
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>resData=data)
    if(resData.success){
      localStorage.setItem('auth-token',resData.token);
      window.location.replace("/");
    }
    else{
      alert(resData.errors)
    }
  }
  return (
    <div className="LoginSignUp">
      <div className="login-container">
        <h1>{state}</h1>

        {state==="Sign up"?<input type="text" name='username' value={formData.username} onChange={changeHandle} placeholder='Your Name'/>:<></>}
        <input type="email" name='email'value={formData.email} onChange={changeHandle} placeholder='Email Address'/>        
        <input type="password" name='password' value={formData.password} onChange={changeHandle} placeholder='Password'/>



        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign up"? <p>Already have an account? <span onClick={()=>setState("Login")}>Login here</span></p>:<></>}
        {state==="Sign up"?<></>:<p>Create an account?  <span onClick={()=>setState("Sign up")}>Click here</span></p>}
        <div className="check-privacy">  
          <input  type="checkbox" name="" id="" />  
          <p>By coutinuing, i agree to the terms of use & privacy policy </p>
        </div>
      </div>
    </div>
  )
}
