import { useState } from "react";
import SuccefullOrder from "../../components/succefullOrder";
import Button from "../../components/Button/button";
import Link from "next/link";
import CheckoutList from "../../components/checkoutList";
import CartListItems from "../../components/cartListItems";
import ShippingAddress from "../../components/shippingAddress";
import PaymentMethod from "../../components/paymentMethod";
import classes from "./checkout.module.css";
// import { auth } from "../../firebaseAdminConfig";
export default function CheckOut() {
  const [activeSection, setActiveSection] = useState(1);
  const [error, setError] = useState("");
  const [shippingAddress, setShippingAddress] = useState({});
  const [payment, setPayment] = useState("");
  let content = "";
  let condition = "";
  switch (activeSection) {
    case 1:
      condition = true;
      content = <CartListItems />;
      break;
    case 2:
      if (shippingAddress.phone) {
        condition = true;
        content = (
          <div>
            <h2>Your Shipping Address :</h2>
            <ul className={classes.addresDetails}>
              {Object.keys(shippingAddress).map((key) => (
                <li key={key}>
                  <span className={classes.label}>{key}:</span>
                  {shippingAddress[key]}
                </li>
              ))}{" "}
              <Button
                name={"edit"}
                color="black"
                onSubmit={() => {
                  setShippingAddress({});
                }}
              />
            </ul>
          </div>
        );
      } else {
        condition = false;
        content = <ShippingAddress setShippingAddress={setShippingAddress} />;
      }
      break;

    case 3:
      if (payment) {
        condition = true;
      }
      content = (
        <>
          <PaymentMethod setPayment={setPayment} />
          {error && (
            <h1>
              {error}
              <Link href="/login">
                <a style={{ color: "blue", fontSize: "24px" }}> Log in</a>
              </Link>
            </h1>
          )}
        </>
      );
      break;
    case 4:
      content = <SuccefullOrder />;
      break;
  }
  const switchSection = () => {
    setActiveSection((id) => {
      if (id >= 3) {
        return id;
      }
      return id + 1;
    });
    if (activeSection === 3 && shippingAddress.phone && payment) {
      submitOrder();
    }
  };
  const submitOrder = async () => {
    try {
      let res = await fetch("/api/orders/setOrder", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ payment, address: shippingAddress }),
      });
      res = await res.json();
      if (res.orderId) {
        setActiveSection(4);
      }
    } catch (e) {
      setError("please sign in first");
    }
  };
  return (
    <div className={classes.mainContainer}>
      {activeSection === 4 ? (
        ""
      ) : (
        <CheckoutList
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}
      <div className={classes.content}>{content}</div>
      <div className={classes.buttonContainer}>
        <button
          disabled={!condition}
          onClick={switchSection}
          className={classes.button}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
