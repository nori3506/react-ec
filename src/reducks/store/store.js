import {
  createStore as reduxCreateStore,
  combineReducers,
} from 'redux';

// import { ProductsReducer } from ''
import { UsersReducer } from '../users/reducers'

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      // products: ProductsReducer,
      users: UsersReducer,
    })
  )
}