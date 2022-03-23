import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import calculateTotalPrice from "../../utils/calculateTotalPrice";
import {
  AiOutlineClose,
  AiOutlineLoading,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import classes from "./cartListItem.module.css";

export default function CartListItems({ closeCart }) {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [sum, setSum] = useState(0);
  useEffect(() => {
    getCartlist();
  }, []);
  const getCartlist = async (e) => {
    setloading(true);
    let res = await fetch("/api/cartList/getCartlist", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    res = await res.json();

    let total = calculateTotalPrice(res.cart);
    setSum(total);
    setLikedProducts(res.cart);

    setloading(false);
  };
  const addORdecrease = async ({ id, size, color }, amount, quantity) => {
    if (quantity == 1 && amount === -1) {
      return;
    }
    setloading(true);

    let res = await fetch("/api/cartList/add_decreaseAmount", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, size, color, amount }),
    });
    res = await res.json();

    let total = calculateTotalPrice(res.cart);
    setSum(total);
    setLikedProducts(res.cart);
    setloading(false);
  };
  const removeItem = async ({ id, size, color }) => {
    setloading(true);
    let res = await fetch("/api/cartList/removeItem", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, size, color }),
    });
    res = await res.json();
    let total = calculateTotalPrice(res.cart);
    setSum(total);
    setLikedProducts(res.cart);
    setloading(false);
  };
  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <AiOutlineLoading className={classes.loading} />
      </div>
    );
  }
  if (!likedProducts[0] && !loading) {
    return (
      <div className={classes.empty}>
        <div className={classes.closes}>
          <AiOutlineClose />
        </div>
        <h2>Nothing is here</h2>
      </div>
    );
  }
  return (
    <>
      <div className={classes.details2}>
        <h1>OverALL Price</h1>
        <h1>{sum}$</h1>
      </div>
      <div className={classes.likedProducts}>
        {likedProducts.map((product, key) => (
          <div key={key} className={classes.product}>
            <div
              className={classes.close}
              onClick={() => {
                removeItem(product.details);
              }}
            >
              <AiOutlineClose />
            </div>
            <div className={classes.image}>
              <Image
                src={product.image || "http://localhost:3000/"}
                alt="Vercel Logo"
                // width={130}
                // height={130}
                layout="fill"
              />
            </div>
            <div className={classes.productDetails}>
              <h3 className={classes.name}>{product.name}</h3>
              <div className={classes.container2}>
                <div className={classes.details}>
                  <h5>Color</h5>
                  <h3>{product.details.color}</h3>
                </div>
                <div className={classes.details}>
                  <h5>Size</h5>
                  <h3>{product.details.size.toUpperCase()}</h3>
                </div>
              </div>
              <div className={classes.container3}>
                <div className={classes.details}>
                  <h5>Price</h5>
                  <h3>{product.unitPrice}$</h3>
                </div>
                <div className={classes.details}>
                  <h5>Amount</h5>
                  <div style={{ display: "flex", alignItems: "end" }}>
                    <h4
                      className={
                        product.quantity === 1
                          ? classes.inactive
                          : classes.amountController
                      }
                      onClick={() => {
                        addORdecrease(product.details, -1, product.quantity);
                      }}
                    >
                      {<AiFillMinusCircle />}
                    </h4>
                    <h3 style={{ margin: "0 15px" }}>{product.quantity}</h3>
                    <h4
                      className={classes.amountController}
                      onClick={() => {
                        addORdecrease(product.details, +1, product.quantity);
                      }}
                    >
                      {<AiFillPlusCircle />}
                    </h4>
                  </div>
                </div>
                <div className={classes.details}>
                  <h5>Total Price</h5>
                  <h3>{product.unitPrice * product.quantity}$</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.checkout}>
        <Link href="/checkout">
          <a className={classes.link} onClick={closeCart}>
            Check Out
          </a>
        </Link>
      </div>
    </>
  );
}
