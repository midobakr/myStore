import Image from "next/image";
import { useRef, useEffect } from "react";
import classes from "./orderItems.module.css";

export default function OrderItems({ items, active }) {
  const containerRef = useRef();
  const test = useRef();
  useEffect(() => {
    if (active) {
      containerRef.current.style.maxHeight = test.current.clientHeight + "px";
    } else {
      containerRef.current.style.maxHeight = "0px";
    }
  }, [active]);
  return (
    <div ref={containerRef} className={classes.likedProducts}>
      <div ref={test}>
        {items.map((product, key) => (
          <div key={key} className={classes.product}>
            <div className={classes.image}>
              <Image
                src={product.image}
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
                    <h3 style={{ margin: "0 15px" }}>{product.quantity}</h3>
                  </div>
                </div>
                <div className={classes.details}>
                  <h5>Total Price</h5>
                  <h3>{product.totalPrice}$</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
