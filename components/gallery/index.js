import { useState, useEffect } from "react";
import Filter from "../filter";
import Product from "../product";
import classes from "./gallery.module.css";
import cookies from "js-cookie";

export default function Gallery({ category, products }) {
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    fetch("/api/whishList/add_remove", {
      method: "GET",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((res) => {
        setLikedProducts(res);
      });
  }, []);
  const addToWhishList = async (id, size, color) => {
    let res = await fetch("/api/whishList/add_remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ id, size, color }),
    });
    res = await res.json();
    setLikedProducts(res);
  };
  const addToCart = async (id, size, color) => {
    console.log(id);
    console.log(size);
    console.log(color);
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
    setCartProducts(res);
  };
  return (
    <div className={classes.gridContainer}>
      <h1 className={classes.category}>{category}</h1>
      <Filter />
      <div className={classes.container}>
        {products.map((product, i) => (
          <Product
            key={i}
            product={product}
            isLiked={likedProducts.includes(`${product.id}`)}
            addToWhishList={addToWhishList}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
