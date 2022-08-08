import { gql, useLazyQuery, useQuery } from '@apollo/client';


export const GET_CUSTOMER = gql `
query GetCustomerCart ($customerId: ID!) {
  customer(customerId: $customerId) {
    id
    items {
      productId
      size
      color
      quantity
    }
  }
}
`;

export const useQueryGetCustomer = () => useLazyQuery(GET_CUSTOMER);
