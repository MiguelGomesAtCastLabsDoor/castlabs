import React, { useState } from "react";
import { Order } from "./Order";
import OrderCard from "./OrderCard";
import OrderForm from "./OrderForm";

interface OrderListProps {
  orders: Order[];
  onSave: (order: Order) => void;
}

function OrderList({ orders, onSave }: OrderListProps) {
  const [orderBeingOrdered, setOrderBeingOrdered] = useState({});
  const handleOrdering = (order: Order) => {
    setOrderBeingOrdered(order);
  };
  const cancelOrdering = () => {
    setOrderBeingOrdered({});
  };
  const items = orders.map((order) => (
    <div key={order.id} className="cols-sm">
      {order === orderBeingOrdered ? (
        <OrderForm order={order} onSave={onSave} onCancel={cancelOrdering} />
      ) : (
        <OrderCard order={order} onOrdering={handleOrdering} />
      )}
    </div>
  ));
  return <div className="row">{items}</div>;
}

export default OrderList;
