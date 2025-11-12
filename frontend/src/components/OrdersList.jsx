// components/OrdersList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/actions";
import OrderCard from "./OrderCard";

export default function OrdersList({ userId = "user123" }) {
  const dispatch = useDispatch();
  const orders = useSelector(s => s.orders.list || []);

  useEffect(() => { dispatch(fetchUserOrders(userId)); }, [dispatch, userId]);

  if (!orders.length) return <div>No orders yet.</div>;
  return <div>{orders.map(o => <OrderCard key={o.id} order={o} />)}</div>;
}
