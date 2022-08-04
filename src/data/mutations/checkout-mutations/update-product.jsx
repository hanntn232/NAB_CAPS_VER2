import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
mutation Mutation($product: UpdateProductInput!) {
  updateProduct(product: $product) {
    id
  }
}
`;