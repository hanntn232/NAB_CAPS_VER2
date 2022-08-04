import { gql } from '@apollo/client';

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($customer: CustomerInput!) {
    updateCustomer(customer: $customer) {
      id
    }
  }
`;