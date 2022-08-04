import React from "react";
import "./style-customer-info.css";
import { Link } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import CheckoutInfoForm from "./checkout-info-form";

//import queries
import { GET_CUSTOMER } from '../../data/queries/checkout-queries/get-customer';
// import { GET_PRODUCT_INFOR } from '../../queries/checkout-queries/get-product-infor';
//import mutation
import { UPDATE_CUSTOMER } from '../../data/mutations/checkout-mutations/update-customer';
import { UPDATE_PRODUCT } from '../../data/mutations/checkout-mutations/update-product';

const CustomerInforForm = ({ checkoutItems }) => {
  const [updateCustomerInfo, resultUpdateCustomerInfo] = useMutation(UPDATE_CUSTOMER);
  const [updateStock, resultUpdateStock] = useMutation(UPDATE_PRODUCT);
  const [GetCartItems, resultGetCustomer] = useLazyQuery(GET_CUSTOMER);
  const [customerInfo, setCustomerInfo] = useState({});

  const fetchCustomerInfo = async () => {
    const customer = await GetCartItems({
      variables: {
        customerId: "nvp",
      },
      fetchPolicy: "no-cache",
    });
    setCustomerInfo(customer.data.customer);
  };

  useEffect(() => {
    fetchCustomerInfo();
  }, []);

  const checked_items = checkoutItems.filter((item) => item.checked);

  const handleUpdateStock = () => {
    checked_items.forEach((item) => {
      if (item.checked) {
        updateStock({
          variables: {
            product: {
              id: item.id,
              stock: item.max_number - item.quantity,
            },
          },
        });
      }
    });
  };

  const UpdateInfo = useCallback(
    (values) => {
      const new_cart = [];
      const items = checkoutItems.forEach((item) => {
        if (!item.checked) {
          new_cart.push({
            productId: item.id,
            color: item.color,
            quantity: item.quantity,
          });
        }
      });

      updateCustomerInfo({
        variables: {
          customer: {
            customerId: "nvp",
            name: values.name,
            location: values.address,
            items: new_cart
          },
        },
      }).then(() => {
        handleUpdateStock();
        resultGetCustomer.refetch();
      });
    },
    [updateCustomerInfo, checkoutItems]
  );

  const [subTotal, setSubTotal] = useState(0);
  const [getLocation, setGetLocation] = useState("");

  function handleGetLocation(e) {
    const result = checkoutItems
      .map((product) => product.price * product.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    setSubTotal(result);
    setGetLocation(e.target.value);
  }

  return (
    <div className="customer-info-wrapper">
      <CheckoutInfoForm
        customerInfo={customerInfo}
        handleGetLocation={handleGetLocation}
        checkoutItems={checked_items}
        getLocation={getLocation}
        subTotal={subTotal}
        updateInfo={UpdateInfo}
      />
    </div>
  );
};

export default CustomerInforForm;
