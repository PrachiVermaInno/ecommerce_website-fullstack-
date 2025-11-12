import { addOrder, setOrders } from "./reducers";
import { getOrders, createOrder as createOrderAPI } from "../api/api";

export const fetchOrders = () => async (dispatch) => {
  try {
    const orders = await getOrders();
    dispatch(setOrders(orders));
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const newOrder = await createOrderAPI(orderData);
    dispatch(addOrder(newOrder));
    return newOrder;
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};
