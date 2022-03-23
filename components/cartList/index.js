import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import myStoreContext from "../../store/storeContext";
import { AiOutlineShopping, AiOutlineClose } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import CartListItems from "../cartListItems";

import classes from "./cartlist.module.css";

export default function CartList() {
  const [active, setActive] = useState(false);

  const { user, cart } = useContext(myStoreContext);

  const shoppingRef = useRef();
  const router = useRouter();
  const doSignOut = async () => {
    const res = await signOut(auth);
    router.push("/");
    closeCart();
  };
  const closeCart = () => {
    shoppingRef.current.checked = false;
  };
  let content = "";
  if (active) {
    content = (
      <div className={classes.container}>
        <CartListItems closeCart={closeCart} />
      </div>
    );
  }
  let loginORlogout = "";
  if (user) {
    loginORlogout = (
      <div style={{ marginLeft: "auto" }}>
        <MdLogout className={classes.icon} onClick={doSignOut} />
      </div>
    );
  } else {
    loginORlogout = (
      <div className={classes.login}>
        <span>
          <Link href="/signup">
            <a onClick={closeCart}>SIGN UP</a>
          </Link>
        </span>
        <span>
          <Link href="/login">
            <a onClick={closeCart}>LOG IN</a>
          </Link>
        </span>
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
          {loginORlogout}
          <div className={classes.options}>
            <span>CART LIST</span>
          </div>
        </div>
        {content}
      </div>
      <label className={classes.label} htmlFor="cartList">
        <AiOutlineShopping
          onClick={() => {
            setActive(true);
          }}
          className={classes.icon}
          style={!!cart ? { fill: "red", color: "red" } : {}}
        />
        {!!cart && <span className={classes.num}>+{cart}</span>}
      </label>
    </div>
  );
}
