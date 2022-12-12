import React, { Fragment, useState, useEffect } from "react";
import { orderAPI } from "./orderAPI";
import OrderList from "./OrderList";
import { Order } from "./Order";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      try {
        const data = await orderAPI.get(currentPage);
        setError("");
        if (currentPage === 1) {
          setOrders(data);
        } else {
          setOrders((orders) => [...orders, ...data]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [currentPage]);

  const saveOrder = (order: Order) => {
    orderAPI
      .put(order)
      .then((updatedOrder) => {
        let updatedOrders = orders.map((p: Order) => {
          return p.id === order.id ? new Order(updatedOrder) : p;
        });
        setOrders(updatedOrders);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };
  return (
    <>
      <h1>Orders</h1>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <OrderList onSave={saveOrder} orders={orders} />
      {!loading && !error}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default OrdersPage;
