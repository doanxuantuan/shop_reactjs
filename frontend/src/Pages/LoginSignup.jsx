import React from 'react'
import './CSS/LoginSignup.css'
export const LoginSignup = () => {
  return (
    <div className="LoginSignUp">
      <div className="login-container">
        <h1>Sign Up</h1>
        <input type="text" placeholder='Your Name'/>
        <input type="text" placeholder='Email Address'/>
        <input type="text" placeholder='Password'/>
        <button>Continue</button>
        <p>Already have an account? <span>Login here</span></p>
        <div className="check-privacy">  
        <input  type="checkbox" name="" id="" />  
          <p>By coutinuing, i agree to the terms of use & privacy policy </p>
        </div>
      </div>
    </div>
  )
}
