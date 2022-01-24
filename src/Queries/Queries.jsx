import { gql } from "apollo-boost";

const getCategoriesQuery = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
        description
        category
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
          type
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

const getOneCategoryQuery = gql`
  query($input: CategoryInput) {
    category (input:{title: $input}) {
      name
      products {
        id
        name
        inStock
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
        description
        category
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
          type
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;


const getProductQuery = gql`
  query($id: String!) {
    product (id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;


const getCurrenciesQuery = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export {
  getCategoriesQuery,
  getOneCategoryQuery,
  getProductQuery,
  getCurrenciesQuery
  };
