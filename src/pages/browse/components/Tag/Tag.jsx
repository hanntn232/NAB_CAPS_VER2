import React from 'react';


const Tag = ({ product }) => {
  const currentDate = new Date();
    
  if (product.featuringFrom && product.featuringTo) {
    const [ featuringFromDay, featuringFromMonth, featuringFromYear ] = product?.featuringFrom.split('/');
    const [ featuringToDay, featuringToMonth, featuringToYear ] = product?.featuringTo.split('/');
    
    let featuringFromDate = new Date(+featuringFromYear, +featuringFromMonth - 1, +featuringFromDay);
    let featuringToDate = new Date(+featuringToYear, +featuringToMonth - 1, +featuringToDay);

    if (featuringFromDate <= currentDate && featuringToDate >= currentDate) 
      return <span className='tag'>Featured</span>
  }
  if (product.stock === 0) {
    return <span className='tag'>Coming soon</span>
  }
  if (product.stock < 50) {
    return <span className='tag'>Only {product.stock} remained</span>
  }
  return null
}

export default Tag;