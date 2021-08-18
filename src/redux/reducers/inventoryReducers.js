import {
  INVENTORY_FAIL,
  INVENTORY_REQUEST,
  INVENTORY_SUCCESS,
} from "../constants/inventoryConstants";

export const getInventoryReducer = (state = { inventory: [] }, action) => {
  switch (action.type) {
    case INVENTORY_REQUEST:
      return { ...state, loading: true };
    case INVENTORY_SUCCESS:
      return { loading: false, inventory: action.payload.data };
    case INVENTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
