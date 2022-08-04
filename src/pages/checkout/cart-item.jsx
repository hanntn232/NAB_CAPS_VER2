import "./style-list-cart-items.css";
import imgsample from "../imgsrc/1.jpg";
import { useState } from "react";

export default function CartItem({ item, updateCart, handleChooseItem }) {
  if (item.quantity === 0) return null;
  
  return (
    <tr>
      <th scope="row" className="form-check">
        <input
          type="checkbox"
          className="align-middle"
          id="flexCheckChecked"
          checked={item.checked}
          onChange={() => {
            handleChooseItem(item);
          }}
        />
      </th>
      <th scope="row" className="table-products">
        <img src={imgsample} alt="" className="img-thumbnail cart-item-img" />
      </th>
      <th scope="row" className="table-products">{item.name}</th>
      <th scope="row" className="table-products">{item.categories || "Undefined"}</th>
      <th scope="row" className="table-products">{item.price}</th>
      <th scope="row" className="table-products">
        <button
          className="item-quantity-edit"
          onClick={() => {
            updateCart(item.id, item.quantity - 1);
          }}
        >
          -
        </button>

        <input
          type="text"
          value={item.quantity}
          className="item-quantity-content"
          disabled
        />

        <button
          disabled={item.max_number === item.quantity}
          className="item-quantity-edit"
          onClick={() => {
            updateCart(item.id, item.quantity + 1);
          }}
        >
          +
        </button>
      </th>
      <th scope="row" className="table-products">{item.price * item.quantity} VND</th>
    </tr>
  );
}
