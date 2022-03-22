import { useState, useRef } from "react";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import ProductImage from "../productImage";
import AddToCart from "../addToCart";
import classes from "./product.module.css";
export default function Product({ product, isLiked, addToWhishList }) {
  return (
    <div className={classes.test}>
      <div className={classes.test2}>
        <Link href={`/product/${product.id}`}>
          <a>
            <ProductImage colors={product.colors} images={product.images} />
          </a>
        </Link>
        <div className={classes.addtocart}>
          <AddToCart product={product} />
        </div>
        <span
          onClick={() => {
            addToWhishList(product.id);
          }}
          className={classes.iconContainer}
        >
          <AiFillHeart
            className={classes.icon}
            style={isLiked ? { fill: "red" } : {}}
          />
        </span>
        {product.sale === "true" && (
          <div className={classes.sale}>{product.salePercent}% off</div>
        )}
      </div>
      <div className={classes.info}>
        <div className={classes.price}>{product.salePrice}$</div>
        {product.sale === "true" ? (
          <div className={classes.Xprice}>{product.price}$</div>
        ) : (
          ""
        )}
        <div className={classes.details}>{product.name}</div>
      </div>
    </div>
  );
}
