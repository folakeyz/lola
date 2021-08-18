import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import { userLoginReducer, userDetailsReducer } from "./reducers/userReducers";

import { getOrderReducer } from "./reducers/orderReducer";
import { getInventoryReducer } from "./reducers/inventoryReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  categoryListReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
} from "./reducers/categoryReducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  userLogin: persistReducer(persistConfig, userLoginReducer),
  profile: persistReducer(persistConfig, userDetailsReducer),
  log: persistReducer(persistConfig, getInventoryReducer),
  order: persistReducer(persistConfig, getOrderReducer),
  productList: persistReducer(persistConfig, productListReducer),
  productDetails: persistReducer(persistConfig, productDetailsReducer),
  productDelete: persistReducer(persistConfig, productDeleteReducer),
  productCreate: persistReducer(persistConfig, productCreateReducer),
  productUpdate: persistReducer(persistConfig, productUpdateReducer),
  categoryList: persistReducer(persistConfig, categoryListReducer),
  categoryDelete: persistReducer(persistConfig, categoryDeleteReducer),
  categoryCreate: persistReducer(persistConfig, categoryCreateReducer),
});

const initialState = {
  // register: {
  //   basicInfo: [],
  //   educationInfo: [],
  // },
  // userLogin: { userInfo: [] },
  // cart: { cartItems: [] },
};

const middleware = [thunk];

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
