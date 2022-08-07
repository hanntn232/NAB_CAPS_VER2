import React, { useState } from 'react';
import Product from '../Products/ProductCard/ProductCard';
import './Pagination.scss';


const renderProducts = (products) => {
  return (
    <ul className='product-list'>
      { products.length !== 0 ? products.map((product => (
        <li key={product.id}>
          <Product product={product} />   
        </li> 
      ))) : <h2 style={{ margin: '4vh auto'}}>There is no matching product.</h2>} 
    </ul>
  );
};

const Pagination = ({ products, currentPage, setCurrentPage }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const renderPageNumbers = pages.map(page => (
    (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) ? <li key={page} id={page} className={currentPage === page ? 'active' : null} onClick={handleClick}>{page}</li> : null
  ));

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>;
  }
      
  return (
    <>
      {renderProducts(currentProducts)}
      <ul className='pagination'>
        <li><button onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>Prev</button></li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li><button onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button></li>
      </ul>
    </>
      
  )
}

export default Pagination;