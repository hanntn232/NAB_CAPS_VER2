import { gql, useQuery } from '@apollo/client'

const GET_CUSTOMER = gql `
{
  customer(customerId: "hmy") {
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

export const useQueryGetCustomer = () => useQuery(GET_CUSTOMER);