import React, { useCallback, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useState } from "react";
import CartItem from "./cart-item";
import { Link, useNavigate } from "react-router-dom";
import "./style-list-cart-items.css";
import "./style-phone-list-cart-items.css";
import logo from "../imgsrc/Logo_NIKE.svg.png";
import Modal from "./modalCheckout";
import { useGlobalState } from '../main-page/customerIdState/customerIdState';

// import queries 
import { GET_LIST_CART_ITEMS } from '../../data/queries/checkout-queries/get-list-cart-items';   
import { GET_PRODUCT_INFOR } from '../../data/queries/checkout-queries/get-product-infor';
// import mutation
import { UPDATE_CART } from '../../data/mutations/checkout-mutations/update-cart';   

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export function ListCartItems({ setProductsToCheckout }) {
  const [productsInCart, setProductsInCart] = useState([]);
  const [originalCartStatus, setOriginalCartStatus] = useState();
  const [customerId, setCustomerId] = useGlobalState('customerID');
  const [GetCartItems, CartItemsResult] = useLazyQuery(GET_LIST_CART_ITEMS);
  const [GetItemInfo, ItemInfoResult] = useLazyQuery(GET_PRODUCT_INFOR);
  const [HandleUpdateCart, CartAfterUpdate] = useMutation(UPDATE_CART);
  const [modalOpen, setModalOpen] = useState(false);
  let navigate = useNavigate();

  const updateCartInLocal = (id, newQuantity) => {
    if (newQuantity === 0) {
      if (!window.confirm("Bạn muốn xóa sản phẩm khỏi giỏ hàng?")) return;
    }
    const newCartItems = productsInCart.map((item) => {
      if (item.id === id) return { ...item, quantity: newQuantity };
      else return { ...item };
    });
    setProductsInCart(newCartItems);
  };

  const handleUpdateCartToServer = async (id, newQuantity) => {
    const newCartItems = productsInCart.map((product) => {
      if (product.id === id) {
        if (newQuantity > 0) {
          return {
            productId: id,
            quantity: newQuantity,
            color: product.color,
          };
        //   if (window.confirm("Remove?"))
        //     return {
        //       productId: id,
        //       quantity: newQuantity,
        //       color: product.color,
        //     };
        }
      }
      return {
        productId: product.id,
        quantity: product.quantity,
        color: product.color,
      };
    });

    const res = HandleUpdateCart({
      variables: {
        customer: {
          items: newCartItems,
          customerId: customerId,
        },
      },
    }).then(() => {
      HandleGetCartItems();
    });
  };

  const HandleGetCartItems = async () => {
    const CartItemsData = await GetCartItems({
      variables: {
        customerId: customerId ,
      },
      fetchPolicy: "no-cache",
    });
    const CartItems = CartItemsData.data.customer.items.map((item) => {
      return { id: item.productId, quantity: item.quantity, color: item.color };
    });

    let ProductDetails = [];
    for (let item of CartItems) {
      const detail = await GetItemInfo({
        variables: {
          productId: item.id,
        },
      });
      if (detail.data.product) {
        ProductDetails.push({
          product: {
            ...detail.data.product,
            max_number: detail.data.product.stock,
          },
        });
      }
    }

    // get items' details
    const products = CartItems.map((cartItem) => {
      const productDetail = ProductDetails.find(
        (e) => e.product?.id === cartItem.id
      );
      return { ...cartItem, ...productDetail?.product };
    });
    // collect the same items into one
    let quantityItem = {};
    products.forEach((product) => {
      quantityItem[product.id] = quantityItem[product.id]
        ? (quantityItem[product.id] += product.quantity)
        : (quantityItem[product.id] = product.quantity);
    });
    let finalRes = [];
    for (let key in quantityItem) {
      const productDetail = products.find((e) => e.id === key);
      finalRes.push({ id: key, ...productDetail, quantity: quantityItem[key] });
    }
    finalRes = finalRes.map((checkedItem) => {
      let cartItem = productsInCart.find((e) => e.id === checkedItem.id) || {};
      return { ...checkedItem, checked: cartItem["checked"] };
    });
    setProductsInCart(finalRes);
    setOriginalCartStatus(finalRes);
  };

  useEffect(() => {
    HandleGetCartItems();
  }, []);

  // total
  const [subToTal, setSubTotal] = useState(0);
  function handleChooseItem(item) {
    let countIsChecked = 0;
    let countProducts = 0;

    let newProductsInCart = productsInCart.map((product) => {
      if (product.quantity > 0) countProducts++;
      if (product.id === item.id) {
        let new_product = { ...product };
        if (new_product["checked"]) {
          new_product["checked"] = false;
        } else {
          new_product["checked"] = true;
          countIsChecked++;
        }
        return new_product;
      } else {
        if (product["checked"]) countIsChecked++;
        return { ...product };
      }
    });

    if (countIsChecked === countProducts) handleSelectAll(true);
    else setSelectAll(false);

    setProductsInCart(newProductsInCart);
  }

  const [selectAll, setSelectAll] = useState(false);
  function handleSelectAll(value) {
    let allProducts = productsInCart.map((product) => {
      let new_product = { ...product };
      new_product["checked"] = value;
      return new_product;
    });
    setProductsInCart(allProducts);
    setSelectAll(value);
  }

  function handleSubTotal() {
    let tmpSubtotal = 0;
    productsInCart.map((product) => {
      if (product.quantity === 0) return 0;
      return product.checked
        ? (tmpSubtotal += product.price * product.quantity)
        : tmpSubtotal;
    });
    setSubTotal(tmpSubtotal);
  }

  useEffect(() => {
    handleSubTotal();
  }, [productsInCart]);

  function handleCheckBeforeClick() {
    handleUpdateCartToServer();

    if (!subToTal) return alert("Vui lòng chọn sản phẩm bạn muốn trước khi chuyển đến bước tiếp theo!");
    else {
      setProductsToCheckout(productsInCart);
      navigate("../thanhtoan");
    }
  }

  return (
    <div className="list-cart-items-wrapper">
      
      {/* main content section */}
      <div className="cart-wrapper">
        <div className="list-cart-header">
          <div className="list-cart-header-left">
            <img src={logo} alt="logo" className="logo" />
            <h2 className="cart-title">GIỎ HÀNG</h2>
          </div>
          <div className="list-cart-header-right">
            <div className="btn-order-content">
              <button
                className="btn btn-dark btn-m inverted-8 openModalBtn"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                TIẾP TỤC MUA HÀNG
              </button>
              {modalOpen && (
                <Modal
                  setOpenModal={setModalOpen}
                  updateCartToServer={handleUpdateCartToServer}
                  removeChange={() => {
                    setProductsInCart(originalCartStatus);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <table className="table container BA-style-table">
          <thead className="thead-light header">
            <tr className="BA-style-row-list-cart-item">
              <th scope="col" colSpan="2">
                <input
                  type="checkbox"
                  className="align-middle"
                  id="flexCheckChecked"
                  checked={selectAll}
                  onChange={(event) => {
                    handleSelectAll(event.target.checked);
                  }}
                />
              </th>
              <th scope="col cart-item-content" style={{ width: 400 }}>
                Sản phẩm
              </th>
              <th scope="col cart-item-category" style={{ width: 150 }}>
                Phân loại
              </th>
              <th scope="col">Giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {productsInCart.map((item, index) => {
              return (
                <CartItem
                  updateCart={updateCartInLocal}
                  item={item}
                  key={index}
                  handleChooseItem={handleChooseItem}
                />
              );
            })}
          </tbody>
        </table>

        <h3 className="cart-total-title">THÔNG TIN THANH TOÁN</h3>
        <div className="cart-total-block">
          <div className="cart-total-wrapper">
            <div className="cart-total-text">Tổng cộng</div>
            <div className="cart-total-content">{subToTal} <sup>đ</sup></div>
          </div>
          <div className="btn-order-content">
            <button
              className={`${
                subToTal === 0
                  ? "btn btn-dark btn-m btn-block disabled order-btn"
                  : "btn btn-dark btn-m btn-block inverted-8 order-btn"
              }`}
              onClick={handleCheckBeforeClick}
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>

      
    </div>

  );
}
