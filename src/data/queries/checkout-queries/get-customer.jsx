import { gql } from '@apollo/client';

export const GET_CUSTOMER = gql`
  query Customer($customerId: ID!) {
    customer(customerId: $customerId) {
      id
      items {
        productId
        color
        size
        quantity
      }
      name
      location
    }
  }
`;
