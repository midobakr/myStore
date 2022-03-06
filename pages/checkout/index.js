import { useState, useEffect } from "react";
import SuccefullOrder from "../../components/succefullOrder";
import Button from "../../components/Button/button";
import CheckoutList from "../../components/checkoutList";
import CartListItems from "../../components/cartListItems";
import ShippingAddress from "../../components/shippingAddress";
import PaymentMethod from "../../components/paymentMethod";
import classes from "./checkout.module.css";
// import { auth } from "../../firebaseAdminConfig";
export default function CheckOut() {
  const [activeSection, setActiveSection] = useState(1);
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
            <h1>Your Shipping Address :</h1>
            <ul className={classes.addresDetails}>
              {Object.keys(shippingAddress).map((key) => (
                <li key={key}>
                  {key}:{shippingAddress[key]}
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
      content = <PaymentMethod setPayment={setPayment} />;
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
      console.log("yeaaaaah");
      submitOrder();
    }
  };
  const submitOrder = async () => {
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
  };
  console.log(payment);
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

// export async function getServerSideProps(context) {
//   const q = query(
//     collection(database, "products")
//     // where("id", "in", [" ygRNFfAjmhJCLLmP99lu"])
//   );

//   const querySnapshot = await getDocs(q);
//   let products = [];
//   querySnapshot.forEach((doc) => {
//     products.push(doc.data());
//   });

//   return { props: { products: products } };
// }
