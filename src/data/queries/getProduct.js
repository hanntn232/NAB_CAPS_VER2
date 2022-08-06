import { gql, useQuery } from '@apollo/client'

const GET_PRODUCTS = gql `
{
  products {
    id
    name
    price
    stock
    colors {
      name
      hexValue
    }
    description
    categories
    pictures
    sizes
    featuringFrom
    featuringTo
  }
}
`;

export const useQueryGetProductList = () => useQuery(GET_PRODUCTS);
// export const useQueryGetProduct = () => useQuery(GET_PRODUCT);