import { useState, useEffect } from "react";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";

import OrderItems from "../../components/orderItems";

import classes from "./myOrders.module.css";

export default function MyOrders() {
  const [activeOrder, setActiveOrder] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    let res = await fetch("/api/orders/getOrders", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    res = await res.json();
    setOrders(res);
  };
  return (
    <div className={classes.container}>
      <h1>My Orders</h1>
      <div className={classes.ordersContainer}>
        {orders.map((order) => (
          <div key={order.id} className={classes.order}>
            <div className={classes.orderDetails}>
              <span className={classes.orderId}>{order.id}</span>
              <span className={classes.orderDate}>
                {formatDate(order.date)}
              </span>
            </div>
            <div className={classes.orderStatus}>
              {/* <span className={classes.label}>Order Status: </span> */}
              <span className={classes.info}>{order.status}</span>
            </div>
            <div className={classes.orderAddress}>
              <div className={classes.contacts}>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Order Name: </span>
                  <span className={classes.info}>
                    {order.shippingDetails.name}
                  </span>
                </div>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Phone Number : </span>
                  <span className={classes.info}>
                    {order.shippingDetails.phone}
                  </span>
                </div>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Order Price : </span>
                  <span className={classes.info}>
                    {order.products.totalPrice}
                  </span>
                </div>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Address : </span>
                  <span className={classes.info}>
                    {order.shippingDetails.building}{" "}
                    {order.shippingDetails.street} ST &nbsp;{" "}
                    {order.shippingDetails.city}
                  </span>
                </div>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Appartment : </span>
                  <span className={classes.info}>
                    {order.shippingDetails.apartment}
                  </span>
                </div>
              </div>
            </div>

            {activeOrder === order.id ? (
              <div className={classes.collapse}>
                <span
                  className={classes.test}
                  onClick={() => {
                    setActiveOrder("");
                  }}
                >
                  <AiOutlineUpCircle />
                </span>
              </div>
            ) : (
              <div className={classes.expand}>
                <span
                  className={classes.test}
                  onClick={() => {
                    setActiveOrder(order.id);
                  }}
                >
                  <AiOutlineDownCircle />
                </span>
              </div>
            )}
            <OrderItems
              active={activeOrder === order.id}
              items={order.products.cart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
