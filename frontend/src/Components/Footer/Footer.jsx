import React from 'react'
import './Footer.css'
import logo_imgae from '../Assets/logo_big.png'
import instagram from '../Assets/instagram_icon.png'
import pintester from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='logo'>
            <img src={logo_imgae} alt="" />
            <p>SHOPPE</p>
        </div>
        <div class="list_inf">
          <ul>
            <li style={{marginRight:'20px'}}>Company</li>
            <li>Product</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='icon_social'>
            <div className="footer-icons-container">
              <img src={instagram} alt="" />
            </div>
            <div className="footer-icons-container">
              <img src={pintester} alt="" />
            </div>
            <div className="footer-icons-container">
              <img src={whatsapp} alt="" />
            </div>
        </div>
        <div className='footer-copyright'>
          <hr/>
          <p>Copyright @ 2023 - ALL Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer