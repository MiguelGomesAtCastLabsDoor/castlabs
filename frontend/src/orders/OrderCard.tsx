import { Order,OrderItem } from "./Order";
import React from "react";
import { Link } from 'react-router-dom';
import ShoeCard from '../shoes/ShoeCard'
import ShoeForm from "../shoes/ShoeForm";
import { Shoe } from '../shoes/Shoe';

interface OrderCardProps {
  order: Order;
  onOrdering: (order: Order) => void;
}

interface OrderItemCardProps {
  orderItem: OrderItem;
}

function OrderItemCard(props:OrderItemCardProps){
  const { orderItem } = props;
  return (
    <div className="card">
      <section className="section dark">
        <p>Amount : {orderItem.amount}</p>
        <p>Size : {orderItem.size.name}</p>
        <ShoeCard shoe={orderItem.shoe}  />
      </section>
    </div>
      )
}

function OrderCard(props: OrderCardProps) {
  const { order, onOrdering } = props;
  const handleOrdering = (orderBeingOrdered: Order) => {
    onOrdering(orderBeingOrdered);
  };
  return (
    <div className="card">
      <section className="section dark">
        <Link to={'/orders/' + order.id}>
        <h5 className="strong">
          <strong>{order.userId}</strong>
        </h5>

        <p>{order.shippingAddress}</p>
        <p>Total Order Amount : {order.total.toLocaleString()}</p>
        </Link>
          <button
          className=" bordered"
          onClick={() => {
            handleOrdering(order);
          }}
        >
          <span className="icon-edit "></span>
          Order
        </button>
      </section>
    </div>
  );
}

export default OrderCard;
