import React, { useCallback } from 'react';
import './ProductCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useMutationAddItemToCart } from '../../../../../data/mutations/addToCart';
import { useQueryGetCustomer } from '../../../../../data/queries/getCustomer';
import Tag from '../../Tag/Tag';
import { FaGreaterThan } from 'react-icons/fa';


const Product = ({ product }) => {
  const [ addItemToCartMutation ] = useMutationAddItemToCart();
  const customerQuery = useQueryGetCustomer();
  const navigate = useNavigate();

  const handleAdd = useCallback(() => {
    if (product.colors.length === 1 && product.sizes.length === 1) {
      addItemToCartMutation ({
        variables: {
          customerId: "hmy",
          item: {
            productId: product.id,
            color: product.colors[0].name,
            size: product.sizes[0],
            quantity: 1
          }
        }
      }).then(() => {
        customerQuery.refetch();
      })
    } else {
      navigate(`/shop/${product.name}/${product.id}`)
    }
  }, [addItemToCartMutation, product.name, product?.id, product?.colors, product?.sizes, navigate, customerQuery]);

  return (
    <div className='product-wrapper'>
      <Link to={`/shop/${product.name}/${product.id}`} className='product'>
        <Tag product={product} />
        <img src={product.pictures[0]} alt={product.name} />
        <div className='info'>
          <div className='description'>{product.description}</div>
          <h5 className='name'>{product.name}</h5>
          <div className='price'>${product.price}</div>
        </div>
      </Link>
      { product.stock !== 0 ? <button className='add' onClick={handleAdd}>Add to Bag</button> : <button className='add disable'>Out of Stock</button> }
      <Link to='/shop' className='more'>
        <h4>Watch more</h4>
        <FaGreaterThan className='icon' />
        <FaGreaterThan className='icon' />
      </Link>
    </div>
  )
}

export default Product;