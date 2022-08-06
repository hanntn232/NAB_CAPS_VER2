import { gql, useMutation } from '@apollo/client'

const ADD_TO_CART = gql `   
  mutation AddItemToCart($customerId: ID!, $item: CartItemInput!) {
    addItemToCart(customerId: $customerId, item: $item) {
      id
    }
  }
`;


export const useMutationAddItemToCart = () => useMutation(ADD_TO_CART);