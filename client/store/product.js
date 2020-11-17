import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/products')
    const products = response.data
    dispatch(getProducts(products))
  } catch (error) {
    console.error('SOMETHING WENT WRONG FETCHING PRODUCTS ', error)
  }
}

export const postNewProduct = newProduct => {
  return async dispatch => {
    try {
      const response = await axios.post(`/api/products`, newProduct)
      const product = response.data
      dispatch(addProduct(product))
    } catch (err) {
      console.log(err)
    }
  }
}
/**
 * REDUCER
 */
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
