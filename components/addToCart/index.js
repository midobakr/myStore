import { useState, useRef, useContext } from "react";
import myStoreContext from "../../store/storeContext";

import classes from "./addToCart.module.css";

export default function AddToCart({ product }) {
  const [addToCartA, setAddToCart] = useState(false);
  const { setCart } = useContext(myStoreContext);

  const sizeRef = useRef();
  const colorRef = useRef();

  const DOaddToCart = async (id, size, color) => {
    let res = await fetch("/api/cartList/add_remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      credentials: "same-origin",
      body: JSON.stringify({ id, size, color }),
    });
    res = await res.json();
    setCart((num) => num + 1);
  };
  const cleanUp = (e) => {
    setAddToCart(false);
  };
  const check = () => {
    let sizeValue = sizeRef.current?.value;
    let colorValue = colorRef.current.value;
    if (sizeValue && colorValue) {
      DOaddToCart(product.id, sizeValue, colorValue);
      setAddToCart(false);
    }
    if (colorValue && !product.availableSizes) {
      DOaddToCart(product.id, "", colorValue);
      setAddToCart(false);
    }
  };

  let component = "";
  if (addToCartA) {
    component = (
      <div>
        <div className={classes.close}>
          <span onClick={cleanUp}>x</span>{" "}
        </div>
        {product.availableSizes && (
          <div className={classes.sizeContainer}>
            <label htmlFor="size">Size</label>
            <select onChange={check} id="size" ref={sizeRef}>
              <option value="" selected disabled hidden>
                select..
              </option>
              {product.availableSizes?.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={classes.sizeContainer}>
          <label htmlFor="color">Color</label>
          <select onChange={check} id="color" ref={colorRef}>
            <option value="" selected disabled hidden>
              select...
            </option>{" "}
            {product.colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  } else {
    component = (
      <span
        onClick={() => {
          if (!product.availableSizes && product.colors.length == 1) {
            DOaddToCart(product.id, "", product.colors[0]);
          } else {
            setAddToCart(true);
          }
        }}
        className={classes.open}
      >
        ADD TO CART
      </span>
    );
  }

  return <div className={classes.addtocart}>{component}</div>;
}
