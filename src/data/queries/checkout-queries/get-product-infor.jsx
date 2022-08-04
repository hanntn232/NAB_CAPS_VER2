import { gql } from '@apollo/client';

export const GET_PRODUCT_INFOR = gql`
query GetProductInfor($productId: ID!) {
  product(id: $productId) {
    id
    name
    price
    pictures
    stock
  }
}
`;