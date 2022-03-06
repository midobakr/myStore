import { useState, useEffect } from "react";
import Image from "next/image";
import classes from "./wishlist.module.css";
import {
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlineLoading,
} from "react-icons/ai";
// import Cookies from "js-cookie";
import cookies from "js-cookie";

export default function wishList() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWishlist = async (e) => {
    setLoading(true);
    let res = await fetch("/api/whishList/getWhishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "same-origin",
    });
    res = await res.json();
    setLikedProducts(res);
    setLoading(false);
  };

  return (
    <div className={classes.group}>
      <input
        className={classes.wishListMark}
        type="checkbox"
        id="wishList"
      ></input>
      <div className={classes.wishList}>
        <div className={classes.nav}>
          <label htmlFor="wishList">
            <AiOutlineClose className={classes.closeIcon} />
          </label>
          <div className={classes.login}>
            <span>SIGN UP</span>
            <span>LOG IN</span>
          </div>
          <div className={classes.options}>
            {/* <span>SHOPPING BAG</span> */}
            <span>WISHLIST</span>
          </div>
        </div>
        <div className={classes.likedProducts}>
          {loading ? (
            <div className={classes.loadingContainer}>
              <AiOutlineLoading className={classes.loading} />
            </div>
          ) : (
            likedProducts.map((product, key) => (
              <div key={key} className={classes.product}>
                <Image
                  className={classes.image}
                  src={product.colors[Object.keys(product.colors)[0]][0]}
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
          )}
        </div>
      </div>
      <label onClick={getWishlist} htmlFor="wishList">
        <AiOutlineHeart className={classes.icon} />
      </label>
    </div>
  );
}
