import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import './inputCustomerID.css'

//Need to import global state to set customerID
import { setGlobalState } from '../customerIdState/customerIdState.jsx'

const POST_CUSTOMER_ID = gql`
query Customer($customerId: ID!) {
    customer(customerId: $customerId) {
      id
      items {
        productId
        color
        size
        quantity
      }
    }
  }
`

export const InputCustomerID = (props) => {
    const [isShow, setIsShow] = useState(props.isShow);
    const [tempID, setTempID] = useState('');
    const id = useRef('')
    const [queryCustomer, data] = useLazyQuery(POST_CUSTOMER_ID);
    
    const submitID = async () => { 
        setGlobalState("customerID", tempID);
        await queryCustomer({
            variables: {
              customerId: 'han' ,
            },
            fetchPolicy: "no-cache",
        });

        //After use setGlobalState, the new value of customerID is passed into customerID. If other components want to use the customerID values --> just import useGlobalState from file customerIdState.jsx. Example: const [customerId, setCustomerId] = useGlobalState('customerID')
        setIsShow(false);
    }
    return isShow && <div className="container" id="inputCustomerID">
        <div className="main">
            <h3>Enter customer ID</h3>
            <input ref={id} type="text" placeholder="Customer ID" id="customerID" onChange={() => setTempID(id.current.value)} />
            <button className="btn" disabled={tempID.trim() === ''} onClick={() => submitID()}>Continue</button>
        </div>
    </div>
}