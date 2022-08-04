import { gql } from '@apollo/client';

export const GET_LIST_CART_ITEMS = gql`
query GetListCartItems($customerId: ID!) {
  customer(customerId: $customerId) {
    items {
      productId
      quantity
      color
    }
  }
}
`;
