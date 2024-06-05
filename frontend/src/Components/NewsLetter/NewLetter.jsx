import React from 'react'
import './NewLetter.css'
const NewLetter = () => {
  return (
    <div className='new-letter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subcribe to our newletter and stay updated</p>
        <div>        
            <input type="text" placeholder='Your Email ID' />
            <button>Subcribe</button>
        </div>
    </div>
  )
}

export default NewLetter