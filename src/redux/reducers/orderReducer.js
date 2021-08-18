import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from "../constants/orderConstants";

export const getOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.data,
      };
    case GET_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
