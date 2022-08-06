import { client, ListCartItems } from "./list-cart-items";
import { ApolloProvider } from "@apollo/client";
import CustomerInforForm from "./customer-infor-form";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SuccessMessage from "./success-page";
import { useState } from "react";
import FooterMy from '../../common/Footer/Footer';
import HeaderMy from '../../common/Header/Header';

function CheckOutUI() {
  const [productsToCheckout, setProductsToCheckout] = useState([]);

  return (
    <div>
      <HeaderMy />
      <ApolloProvider client={client}>
        {/* <BrowserRouter> */}
        <Routes>
          <Route
            path="/thanhtoan"
            element={<CustomerInforForm checkoutItems={productsToCheckout} />}
          />
          <Route path="/thanhcong" element={<SuccessMessage />}></Route>
          <Route
            path="/"
            element={
              <ListCartItems setProductsToCheckout={setProductsToCheckout} />
            }
          />
        </Routes>
        {/* </BrowserRouter> */}
      </ApolloProvider>
      {/* footer section  */}
      <FooterMy />
      
    </div>
  );
}

export default CheckOutUI;
