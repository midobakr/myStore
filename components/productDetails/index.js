import AddToCart from "../addToCart";

import classes from "./productDetails.module.css";

export default function productDetails({ product }) {
  return (
    <div className={classes.container}>
      <AddToCart product={product} />
      <div className={classes.details}>
        <div className={classes.item}>
          <span className={classes.itemLabel}>BRAND :</span>
          <span className={classes.itemContent}>{product.brand}</span>
        </div>
        <div className={classes.item}>
          <span className={classes.itemLabel}>PRICE :</span>
          <span className={classes.itemContent}>{product.price}$</span>
        </div>
        <div className={classes.item}>
          <span className={classes.itemLabel}>AVAILABLE COLORS :</span>
          <span className={classes.itemContent}>
            {product.colors.map((i) => i + "-")}
          </span>
        </div>
        <div className={classes.item}>
          <span className={classes.itemLabel}>DESCRIPTION :</span>
          <span className={classes.itemContent}>{product.description}</span>
        </div>
        {product.sale.available && (
          <div className={classes.item}>
            <span className={classes.itemLabel}>SALE :</span>
            <span className={classes.itemContent}>{product.sale.pecent}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
