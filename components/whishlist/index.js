import { useState, useContext, useRef } from "react";
import myStoreContext from "../../store/storeContext";
import Image from "next/image";
import classes from "./wishlist.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdLogout } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineClose,
  AiOutlineLoading,
} from "react-icons/ai";

export default function WishList() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { whishList, user } = useContext(myStoreContext);
  const shoppingRef = useRef();
  const router = useRouter();
  const doSignOut = async () => {
    const res = await signOut(auth);
    router.push("/");
    closeCart();
  };
  const getWishlist = async (e) => {
    setLoading(true);
    let res = await fetch("/api/whishList/getWhishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },

      credentials: "same-origin",
    });
    res = await res.json();
    setLikedProducts(res);
    setLoading(false);
  };
  const closeCart = () => {
    shoppingRef.current.checked = false;
  };
  let loginORlogout = "";
  if (user) {
    loginORlogout = (
      <div>
        <MdLogout className={classes.icon4} onClick={doSignOut} />
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
        className={classes.wishListMark}
        type="checkbox"
        id="wishList"
      ></input>
      <div className={classes.wishList}>
        <div className={classes.nav}>
          <label htmlFor="wishList">
            <AiOutlineClose className={classes.closeIcon} />
          </label>
          {loginORlogout}
          <div className={classes.options}>
            <span>WISHLIST</span>
          </div>
        </div>
        <div className={classes.likedProducts}>
          {loading ? (
            <div className={classes.loadingContainer}>
              <AiOutlineLoading className={classes.loading} />
            </div>
          ) : likedProducts[0] ? (
            likedProducts.map((product, key) => (
              <div key={key} className={classes.product}>
                <Image
                  className={classes.image}
                  src={product.images[product.colors[0]][0]}
                  alt="Vercel Logo"
                  width={100}
                  height={150}
                  //   layout="responsive"
                />
                <div className={classes.productDetails}>
                  <h4>{product.brand}</h4>
                  <h4>{product.name}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className={classes.empty}>
              <div className={classes.closes}>
                <AiOutlineClose />
              </div>
              <h2>Nothing is here</h2>
            </div>
          )}
        </div>
      </div>
      <label onClick={getWishlist} htmlFor="wishList">
        {whishList.length ? (
          <AiFillHeart className={classes.icon2} />
        ) : (
          <AiOutlineHeart className={classes.icon} />
        )}
      </label>
    </div>
  );
}
