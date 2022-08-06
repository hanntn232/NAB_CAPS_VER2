import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.scss';


export const Banner1 = () => {
  return (
    <div className='banner1'>
      <img src='https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/15af89c3-e6f7-4be1-8cda-e91f05203317/nike-just-do-it.jpg' alt='' />
      <div className='label'>
        <h2>Back-To-School Essentials</h2>
        <span>Everything you need to bring your best on your first day back.</span>
        <Link to='/shop' className='btn'>Shop now</Link>
      </div>
    </div>
  )
}

export const Banner2 = () => {
  return (
    <div className='banner2'>
      <div className="item">
        <img src="https://images.pexels.com/photos/4753986/pexels-photo-4753986.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
      </div>
      <div className="item">
        <h3 className="label--small">AUTUMN NEW ARRIVALS</h3>
        <h1 className="label">New Season</h1>
        <h1 className="label">New Collection</h1>
        <Link to="/shop" className='link'>
            <button>CHOOSE YOUR STYLE</button>
        </Link>
      </div>
      <div className="item">
        <img src="https://images.pexels.com/photos/7856965/pexels-photo-7856965.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
      </div>
    </div>
  )
}

export const Banner3 = () => {
  return (
    <div className='banner3'>
      <img src='https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/5e4a0ef7-a2c9-483a-8e5b-45d8277db19d/nike-just-do-it.jpg' alt='' />
      <div className='label'>
        <h2>JUST DO IT</h2>
        <span>Wear your style. Be yourself</span>
      </div>
    </div>
  )
}

export const Banner4 = () => {
  return (
    <div className='banner4'> 
      <h2>#stayhome</h2>
      <p>Save more with coupons &amp; up to 70% off!</p>
    </div>
  )
}
  