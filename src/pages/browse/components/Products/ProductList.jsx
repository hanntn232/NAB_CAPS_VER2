import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './ProductList.scss';
import { useQueryGetProductList } from '../../../../data/queries/getProduct';
import Header from '../../../../common/Header/Header';
import Pagination from '../Pagination/Pagination';
import { Banner4 } from '../Banner/Banner';
import Footer from '../../../../common/Footer/Footer';
import { BsSliders } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";


const Products = () => {
  const { loading, error, data } = useQueryGetProductList();
  const [ searchQuery, setSearchQuery ] = useState(() => localStorage.getItem('searchValue'));
  const [ selectedCategory, setSelectedCategory ] = useState('');
  const [ selectedColor, setSelectedColor ] = useState();
  const [ selectedPrice, setSelectedPrice ] = useState(0);
  const [ sortProduct, setSortProduct ] = useState();
  const [ currentPage, setCurrentPage ] = useState(1);

  // Update the document title using the browser API
  useEffect(() => { document.title = `Shop. Nike For You` }, []);

  const productList = data?.products.map((product) => product);
  let filteredList = productList?.reverse();
  let featuredList = filteredList?.filter(product => product.featuringFrom && product.featuringTo);

  const currentDate = new Date();
  featuredList = featuredList?.filter(product => {
    const [ featuringFromDay, featuringFromMonth, featuringFromYear ] = product.featuringFrom.split('/');
    const [ featuringToDay, featuringToMonth, featuringToYear ] = product.featuringTo.split('/');

    const featuringFromDate = new Date(+featuringFromYear, +featuringFromMonth - 1, +featuringFromDay);
    const featuringToDate = new Date(+featuringToYear, +featuringToMonth - 1, +featuringToDay);
    
    if (featuringFromDate <= currentDate && featuringToDate >= currentDate) {
      return product;
    }  
    return null;
  })

  filteredList = filteredList?.filter(product => !featuredList.includes(product));
  filteredList = featuredList?.concat(filteredList);


  filteredList = useMemo(() => {
    if (searchQuery) {
      return productList?.filter(product => product.name.toLowerCase().includes(searchQuery)); 
    }
    return filteredList;
  }, [searchQuery, productList, filteredList]);

  filteredList = useMemo(() => {
    if (selectedColor) {
      return filteredList?.filter(product => product.colors.map(color => color.name).find(element => element === selectedColor)); 
    }
    return filteredList;
  }, [selectedColor, filteredList]);

  filteredList = useMemo(() => {
    if (selectedCategory) {
      return filteredList?.filter(product => product.categories.find(element => element === selectedCategory)); 
    }
    return filteredList;
  }, [selectedCategory, filteredList]);

  filteredList = useMemo(() => {
    if (selectedPrice !== 0) {
      return filteredList?.filter(product => product.price >= parseInt(selectedPrice, 10));
    }
    return filteredList;
  }, [selectedPrice, filteredList]);


  featuredList = filteredList?.filter(product => {
    if (product.featuringFrom && product.featuringTo) {
      const [ featuringFromDay, featuringFromMonth, featuringFromYear ] = product.featuringFrom.split('/');
      const [ featuringToDay, featuringToMonth, featuringToYear ] = product.featuringTo.split('/');

      const featuringFromDate = new Date(+featuringFromYear, +featuringFromMonth - 1, +featuringFromDay);
      const featuringToDate = new Date(+featuringToYear, +featuringToMonth - 1, +featuringToDay);
      
      if (featuringFromDate <= currentDate && featuringToDate >= currentDate) {
        return product;
      }
    }
    return null;
  })

  filteredList = filteredList?.filter(product => !featuredList.includes(product));
 

  filteredList = useMemo(() => {
    if (sortProduct === 'ASC') {
      return filteredList.sort((a, b) => a.price - b.price);
    }
    if (sortProduct === 'DESC') {
      return filteredList.sort((a, b) => b.price - a.price);
    }
    if (sortProduct === 'A-Z') {
      return filteredList.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    if (sortProduct === 'Z-A') {
      return filteredList.sort((a, b) => a.name > b.name ? -1 : 1);
    }
    return filteredList;
  }, [sortProduct, filteredList]);
  
  filteredList = featuredList?.concat(filteredList);

  if (error) return <h1>Error: {error} </h1>;
  if (loading) return <h2 style={{ margin: '2vh auto' }}>Loading your products... 🚀</h2>;

  return (
    <div className='shop'>
      <Header setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} searchValue={searchQuery} link={'Shop'} setCurrentPage={setCurrentPage} />
      <div className='filter-products'>
        <label htmlFor='mobile-filter' className='mobile-filter-btn'>
          <span>Filter</span>
          <BsSliders />
        </label>
        <input type='checkbox' id='mobile-filter' hidden className='mobile-filter-checkbox-input' />
        <div className='filter'>
          <label htmlFor='mobile-filter' className='close-btn'>
            <div>Filter</div>
            <IoCloseOutline />       
          </label>
          <div className={selectedCategory === '' ? 'all active' : 'all'} onClick={() => setSelectedCategory('')}>All Shoes</div>
          <span className='gender'>Gender</span>
          <div className='selection'>
            <div className={selectedCategory === 'Men' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Men')}>Men</div>
            <div className={selectedCategory === 'Women' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Women')}>Women</div>
            <div className={selectedCategory === 'Unisex' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Unisex')}>Unisex</div>
          </div>
          <span>Lifestyle</span>
          <div className='selection'>
            <div className={selectedCategory === 'Jordan' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Jordan')}>Jordan</div>
            <div className={selectedCategory === 'Shoes' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Shoes')}>Shoes</div>
            <div className={selectedCategory === 'Running Shoes' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Running Shoes')}>Running Shoes</div>
            <div className={selectedCategory === 'Skateboarding' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Skateboarding')}>Skateboarding</div>
            <div className={selectedCategory === 'Training & Gym' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Training & Gym')}>Training &amp; Gym</div>
          </div>

          <div className='color-selection-header'>
            <span>Color</span>
            <span className='clear-color' onClick={() => setSelectedColor()}>Clear</span>
          </div>
          <div className='selection colors'>
            <div className={selectedColor === 'Black' ? 'color select' : 'color'} style={{ backgroundColor: "black" }} onClick={() => setSelectedColor('Black')}></div>
            <div className={selectedColor === 'Aquamarine' ? 'color select' : 'color'} style={{ backgroundColor: "aquamarine" }} onClick={() => setSelectedColor('Aquamarine')}></div>
            <div className={selectedColor === 'White' ? 'color select' : 'color'} style={{ backgroundColor: "white" }} onClick={() => setSelectedColor('White')}></div>
            <div className={selectedColor === 'University Blue' ? 'color select' : 'color'} style={{ backgroundColor: "#3c91d0" }} onClick={() => setSelectedColor('University Blue')}></div>
            <div className={selectedColor === 'LightSalmon' ? 'color select' : 'color'} style={{ backgroundColor: "lightsalmon" }} onClick={() => setSelectedColor('LightSalmon')}></div>
            <div className={selectedColor === 'Pink' ? 'color select' : 'color'} style={{ backgroundColor: "#cdb1a9" }} onClick={() => setSelectedColor('Pink')}></div>
            <div className={selectedColor === 'Orange' ? 'color select' : 'color'} style={{ backgroundColor: "#e99b66" }} onClick={() => setSelectedColor('Orange')}></div>
          </div>

          <span className='price'>Price: <span style={{ color: "darkorange" }}>${selectedPrice}</span></span>
          <div className='price-container'>
            <input type="range" min='0' max='2000' className='slider' onChange={e => setSelectedPrice(e.target.value)} />
          </div>

          <div className='sort-product'>
            <span className='sort'>Sort by price</span>
            <div className={sortProduct === 'ASC' ? 'option active' : 'option'} onClick={() => setSortProduct('ASC')}>Low to High</div>
            <div className={sortProduct === 'DESC' ? 'option active' : 'option'} onClick={() => setSortProduct('DESC')}>High to Low</div>

            <span className='sort'>Sort by name</span>
            <div className={sortProduct === 'A-Z' ? 'option active' : 'option'} onClick={() => setSortProduct('A-Z')}>From A to Z</div>
            <div className={sortProduct === 'Z-A' ? 'option active' : 'option'} onClick={() => setSortProduct('Z-A')}>From Z to A</div>
            <div className='option default' onClick={() => setSortProduct()}>Reset</div>
          </div>
        </div>
        <div className='products-wrapper'>
          <Pagination products={filteredList} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
      <Banner4 />
      <Footer />
      <Outlet />
    </div>
  )
}

export default Products;