import { client, ListCartItems } from "./list-cart-items";
import { ApolloProvider } from "@apollo/client";
import CustomerInforForm from "./customer-infor-form";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SuccessMessage from "./success-page";
import { useState } from "react";
import Footer from "./footer";

function CheckOutUI() {
  const [productsToCheckout, setProductsToCheckout] = useState([]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=League+Spartan&family=Roboto:wght@100;300&display=swap"
        rel="stylesheet"
      />
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
      <Footer />

      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"
      ></script>



      
    </div>
  );
}

export default CheckOutUI;
