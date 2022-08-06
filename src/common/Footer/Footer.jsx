import React from 'react';
import './Footer.scss';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';


const Footer = () => {
  return (
    <div className='footer'>
      <div className="top">
        <div className="left">
          <ul className="primary-section">
            <li>GIFT CARDS</li>
            <li>PROMOTIONS</li>
            <li>FIND A STORE</li>
            <li>SIGN UP FOR EMAIL</li>
            <li>BECOME A MEMBER</li>
            <li>NIKE JOURNAL</li>
            <li>SEND US FEEDBACK</li>
          </ul>
          <ul className="secondary-section">
            <li className='title'>GET HELP</li>
            <li>Order Status</li>
            <li>Shipping And Delivery</li>
            <li>Returns</li>
            <li>Payment Options</li>
            <li>Gift Card Balance</li>
            <li>Contact Us</li>
          </ul>
          <ul className="secondary-section">
            <li className='title'>ABOUT US</li>
            <li>News</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Purpose</li>
            <li>Sustainability</li>
          </ul>
          <div className="payment">
            <div className="title">PAYMENT GATEWAYS</div>
            <ul className='logos'>
              <li className='logo'>
                <img src={require ("../../assets/img/VISA.png")} alt="VISA" />
              </li>
              <li className='logo'>
                <img src={require ("../../assets/img/AmericanExpress.png")} alt="American Express" />
              </li>
              <li className='logo'>
                <img src={require ("../../assets/img/MasterCard.png")} alt="MasterCard" />
              </li>
              <li className='logo'>
                <img src={require ("../../assets/img/PayPal.png")} alt="PayPal" />
              </li>
              <li className='logo'>
                <img src={require ("../../assets/img/JCB.png")} alt="JCB" />
              </li>
              <li className='logo'>
                <img src={require ("../../assets/img/GooglePay.png")} alt="Google Pay" />
              </li>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="social">
            <FaTwitter />
          </div>
          <div className="social">
            <FaFacebookF />
          </div>
          <div className="social">
            <FaInstagram />
          </div>
          <div className="social">
            <FaYoutube />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="location">
          <MdLocationOn />
          <div>Ho Chi Minh City, Vietnam</div>
        </div>
        <div className='sm-text'>© 2022 NAB WeCamp Capstone Project. All Rights Reserved</div>
      </div>
    </div>
  )
}

export default Footer;