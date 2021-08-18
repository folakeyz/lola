import axios from "axios";

import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_REQUEST,
  GET_ORDERS_FAIL,
} from "../constants/orderConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../config";

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDERS_REQUEST,
    });

    const userInfo = await AsyncStorage.getItem("userInfo");
    const token = JSON.parse(userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/inventory/pendingOrders`,
      config
    );

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_ORDERS_FAIL,
      payload: message,
    });
  }
};
