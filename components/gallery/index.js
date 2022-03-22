import { useState, useEffect, useContext, useCallback } from "react";

import Filter from "../filter";
import Product from "../product";
import classes from "./gallery.module.css";
import storeContext from "../../store/storeContext";
import { AiOutlineLoading, AiOutlineClose } from "react-icons/ai";
export default function Gallery({ category, search }) {
  const [likedProducts, setLikedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setWhishList } = useContext(storeContext);

  const addToWhishList = async (id, size, color) => {
    let res = await fetch("/api/whishList/add_remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      credentials: "same-origin",
      body: JSON.stringify({ id, size, color }),
    });
    res = await res.json();
    setLikedProducts(res);
    setWhishList(res);
  };
  const addToCart = async (id, size, color) => {
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
  };
  const getProducts = useCallback(async () => {
    const link = !search
      ? "/api/products/getProducts?" + new URLSearchParams({ category })
      : "/api/products/searchProducts?" +
        new URLSearchParams({ keywords: category });
    let res = await fetch(link);
    res = await res.json();
    setProducts(res.products);
    console.log("yeah all is working \n", res);
  }, [category, search]);
  const getLikedProducts = useCallback(() => {
    fetch("/api/whishList/getLikedproducts", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLikedProducts(res);
        setWhishList(res);
      });
  }, [setWhishList]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getProducts();
      await getLikedProducts();
      setLoading(false);
    })();
    console.log("it only needs to run one time");
  }, [getLikedProducts, getProducts]);
  let content = "";
  if (loading) {
    content = (
      <div className={classes.loading}>
        <AiOutlineLoading />
      </div>
    );
  } else if (!products[0]) {
    content = (
      <div className={classes.closeContainer}>
        <div className={classes.close}>
          <AiOutlineClose />
        </div>
        <h2>Nothing is here</h2>
      </div>
    );
  }

  if (products[0]) {
    content = (
      <div className={classes.container}>
        {products.map((product, i) => (
          <Product
            key={product.id}
            product={product}
            isLiked={likedProducts.includes(`${product.id}`)}
            addToWhishList={addToWhishList}
            addToCart={addToCart}
          />
        ))}
      </div>
    );
  }

  let topContent = "";
  if (search) {
    topContent = (
      <div className={classes.container5}>
        <h1>Search for :{category}</h1>
        <h4>Found : {products.length} items</h4>
      </div>
    );
  } else {
    topContent = (
      <>
        <h1 className={classes.category}>{category}</h1>
        <Filter setProducts={setProducts} setLoading={setLoading} />
      </>
    );
  }
  return (
    <div className={classes.gridContainer}>
      {topContent}
      {content}
    </div>
  );
}
