import React, { useCallback, useState, useEffect } from 'react';
import Header from '../../../../../common/Header/Header';
import './ProductDetail.scss';
import { useParams } from 'react-router-dom';
import { useQueryGetProductList } from '../../../../../data/queries/getProduct';
import { useQueryGetCustomer } from '../../../../../data/queries/getCustomer';
import { useMutationAddItemToCart } from '../../../../../data/mutations/addToCart';
import Tag from '../../Tag/Tag';
import Footer from '../../../../../common/Footer/Footer';


const ProductDetail = () => {
  const { loading, error, data } = useQueryGetProductList();
  const customerQuery = useQueryGetCustomer();
  const [ addItemToCartMutation ] = useMutationAddItemToCart();
  const [ size, setSize ] = useState();
  const [ sizeSelected, setSizeSelected] = useState();
  const [ color, setColor ] = useState();
  const [ colorSelected, setColorSelected] = useState();
  const paramValue = useParams();
  const productId = paramValue.id;
  const productName = paramValue.name;
  

  const product = data?.products.find(element => element.id === paramValue.id);
  let productImage = product?.pictures?.slice(1); // Remove the first element of picture array
  const colorArr = product?.colors.map((color) => color.hexValue);
  // const productsColorObj = productList.map((product) => product.colors.map((color) => color.name)); // lấy ra tên màu từ obj colors
  // const productsColorObj = data?.products.map((product) => product.colors); // lấy ra màu từ obj colors

  useEffect(() => {
    document.title = `${product?.name}`
  }, [product?.name]);

  const handleAdd = useCallback(() => {
    addItemToCartMutation ({
      variables: {
        customerId: "hmy",
        item: {
          productId: product.id,
          color: color,
          size: size,
          quantity: 1
        }
      }
    }).then(() => {
      customerQuery.refetch();
    })
  }, [addItemToCartMutation, product?.id, color, size, customerQuery]);

  console.log(colorSelected, sizeSelected)

  if (error) return <h1>Error: {error} </h1>;
  if (loading) return <h2 style={{ textAlign: 'center', padding: '12vh 0', fontWeight: '500' }}>Loading your product...</h2>;

  return (
    <div id={productId}>
      <Header link={'Shop'} />
      <div className='product-detail'>
        <Tag product={product} />
        <div className='image-container'>
          {
            productImage.map((picture, index) => (
              picture.includes('webm') ? <video key={index} src={picture} autoPlay={true} loop={true} playsInline="" tabIndex="-1" muted={true}/> : <img key={index} src={picture} alt='shoes' />
            ))
          }
        </div>
        <div className='detail'>
          <h2 className='name'>{productName}</h2>
          <h4 className='desc'>{product.description}</h4>
          <p className='price'>${product.price}</p>
          <div className='size-selection'>
              <p>Select size</p>
              <div className="wrapper">
                { product.stock === 0 ? product.sizes.map((size, index) => (
                    <div key={index} className='size disable'>{size}</div>
                )) : product.sizes.map((size, index) => (
                    <div 
                      key={index} 
                      className={sizeSelected === size ? 'size select' : 'size'} 
                      onClick={() => { 
                        setSize(size); 
                        setSizeSelected(size) 
                      }}>
                      {size}
                    </div>
                ))}
              </div>
          </div>
          <div className='color-selection'>
              <p>Select color</p>
              <div className="wrapper">
                { product.stock === 0 ? colorArr.map((color, index) => (
                    <div key={index} className='color disable' style={{ backgroundColor: `${color}`}}></div>
                )) : colorArr.map((color, index) => (
                    <div 
                      key={index} 
                      className={colorSelected === color ? 'color select' : 'color'}  
                      style={{ backgroundColor: `${color}`}} 
                      onClick={() => {
                        setColor(color);
                        setColorSelected(color)
                      }}>
                    </div>
                ))}
              </div>
          </div>
          { product.stock !== 0 ? <button className='add' onClick={handleAdd}>Add to Bag</button> : <button className='add disable'>Add to Bag</button> }
          <h4 className='quote'>Keep pushing your runs to the limit. The {product.name} keeps you going with the same supersoft feel that lets you feel the potential when your foot hits the pavement. We created the shoe with plenty of snappy responsiveness and our highest level of support to keep you feeling secure and competitive. It's one of our most tested shoes, still designed for you to stay on the track and away from the sidelines.</h4>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail;