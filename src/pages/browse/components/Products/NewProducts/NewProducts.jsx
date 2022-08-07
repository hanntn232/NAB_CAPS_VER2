import React from 'react';
import Product from '../ProductCard/ProductCard';
import './NewProducts.scss';

const NewProducts = ({ products }) => {
  return (
    <div className='new-products'>
      <ul className='product-list' style={{ justifyContent: 'center' }}>
        { products?.slice(0, 8).map(product => (
          <li key={product.id}>
            <Product product={product} />   
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewProducts;