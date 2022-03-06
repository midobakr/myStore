import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineClose } from "react-icons/ai";

import CartListItems from "../cartListItems";

import classes from "./cartlist.module.css";

import { auth } from "../../firebaseConfig";
import { getIdToken } from "firebase/auth";
export default function CartList() {
  // let sum = 10;
  const [active, setActive] = useState(false);

  const shoppingRef = useRef();
  useEffect(() => {
    if (auth.currentUser) {
      console.log("aywakda");
      getIdToken(auth.currentUser).then((token) => {
        localStorage.setItem("token", token);
      });
    }
  });
  const closeCart = () => {
    shoppingRef.current.checked = false;
  };
  let content = "";

  console.log("active", active);
  if (active) {
    content = (
      <div className={classes.container}>
        <CartListItems />
        <div className={classes.checkout}>
          <Link href="/checkout">
            <a className={classes.link} onClick={closeCart}>
              Check Out
            </a>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.group}>
      <input
        ref={shoppingRef}
        className={classes.cartListMark}
        type="checkbox"
        id="cartList"
      ></input>
      <div className={classes.cartList}>
        <div className={classes.nav}>
          <label htmlFor="cartList">
            <AiOutlineClose
              className={classes.closeIcon}
              onClick={() => {
                setActive(false);
              }}
            />
          </label>
          <div className={classes.login}>
            <span>SIGN UP</span>
            <span>LOG IN</span>
          </div>
          <div className={classes.options}>
            <span>CART LIST</span>
          </div>
        </div>
        {content}
      </div>
      <label htmlFor="cartList">
        <AiOutlineShopping
          onClick={() => {
            setActive(true);
          }}
          className={classes.icon}
        />
      </label>
    </div>
  );
}
