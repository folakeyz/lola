import {
  INVENTORY_SUCCESS,
  INVENTORY_REQUEST,
  INVENTORY_FAIL,
} from "../constants/inventoryConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

export const getInventory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();
    const userInfo = await AsyncStorage.getItem("userInfo");
    const token = JSON.parse(userInfo);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/api/inventory`, config);

    dispatch({
      type: INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
