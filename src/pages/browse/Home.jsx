import React, { useEffect } from 'react';
import './Home.scss';
import { useQueryGetProductList } from '../../data/queries/getProduct';
import Header from '../../common/Header/Header';
import FeaturedProducts from './components/Products/FeaturedProducts/FeaturedProducts';
import { Banner1, Banner2 } from './components/Banner/Banner';
import Footer from '../../common/Footer/Footer';
import NewProducts from './components/Products/NewProducts/NewProducts';
import { InputCustomerID } from '../main-page/inputCustomerID/inputCustomerID';
import { useGlobalState } from '../main-page/customerIdState/customerIdState';


const Home = () => {
  const { data } = useQueryGetProductList();
  let products = data?.products.map((product) => product).reverse(); 
  const [customerId, setCustomerId] = useGlobalState('customerID')

  useEffect(() => { document.title = `Home. Nike For You` }, []);

  return (
    <>
      <InputCustomerID isShow={customerId === null ? true:false} />
      <div className='home'>
        <Header link={'Home'} />
        <Banner1 />
        <div className='header'>
          <h2>Featured Products</h2>
          <p>Featured Collection For This Autumn</p>
        </div>
        <FeaturedProducts products={products} />
        <Banner2 />
        <div className='header'>
          <h2>New Arrivals</h2>
          <p>New Collection New Modern Design</p>
        </div>
        <NewProducts products={products} />
        <Footer />
      </div>
    </>
  )
}

export default Home;