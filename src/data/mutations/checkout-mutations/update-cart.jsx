import { gql } from '@apollo/client';

export const UPDATE_CART = gql`
  mutation UpdateCart($customer: CustomerInput!) {
    updateCustomer(customer: $customer) {
      id
    }
  }
`;