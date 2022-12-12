import React, { SyntheticEvent, useState } from "react";
import { Order } from "./Order";

interface OrderFormProps {
  order: Order;
  onSave: (order: Order) => void;
  onCancel: () => void;
}
function OrderForm({ order: initialOrder, onSave, onCancel }: OrderFormProps) {
  const [order, setOrder] = useState(initialOrder);
  const [errors, setErrors] = useState({
    userId: "",
    shippingAddress: "",
  });
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(order);
  };
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === "checkbox" ? checked : value;

    //if input type is number convert the updatedValue string to a +number
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedOrder: Order;
    // need to do functional update b/c
    // the new order state is based on the previous order state
    // so we can keep the order properties that aren't being edited +like order.id
    // the spread operator (...) is used to
    // spread the previous order properties and the new change
    setOrder((p) => {
      updatedOrder = new Order({ ...p, ...change });
      return updatedOrder;
    });
    setErrors(() => validate(updatedOrder));
  };
  function validate(order: Order) {
    let errors: any = { userId: "", shippingAddress: "" };
    if (order.userId.length === 0) {
      errors.userId = "User Id is required";
    }
    if (order.shippingAddress.length > 0 && order.shippingAddress.length < 3) {
      errors.shippingAddress =
        "Shipping Address needs to be at least 3 characters.";
    }

    return errors;
  }
  function isValid() {
    return errors.userId.length === 0 && errors.shippingAddress.length === 0;
  }
  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="userId">Order Brand</label>
      <input
        type="text"
        name="userId"
        placeholder="enter userId"
        value={order.userId}
        onChange={handleChange}
      />
      {errors.userId.length > 0 && (
        <div className="card error">
          <p>{errors.userId}</p>
        </div>
      )}
      <label htmlFor="shippingAddress">Order Display Name</label>
      <textarea
        name="shippingAddress"
        placeholder="enter shipping Address "
        value={order.shippingAddress}
        onChange={handleChange}
      />
      {errors.shippingAddress.length > 0 && (
        <div className="card error">
          <p>{errors.shippingAddress}</p>
        </div>
      )}

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
