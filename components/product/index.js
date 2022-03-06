import { useState, useRef } from "react";
import { AiFillHeart } from "react-icons/ai";
import ProductImage from "../productImage";
import classes from "./product.module.css";
export default function Product({
  product,
  isLiked,
  addToWhishList,
  addToCart,
}) {
  const [addToCartA, setAddToCart] = useState(false);
  const sizeRef = useRef();
  const colorRef = useRef();
  //  useEffect(()=>{
  //   let savedProducts = "";
  //   if (cookies.get("whishList")) {
  //     savedProducts = cookies.get("whishList");
  //   }
  //  },[])
  // const addToWhishList = () => {
  //   let savedProducts = "";
  //   if (cookies.get("whishList")) {
  //     savedProducts = cookies.get("whishList");
  //   }
  //   if (savedProducts.search(product.id) >= 0) {
  //     savedProducts = savedProducts.replace(`${product.id}@`, "");
  //   } else {
  //     savedProducts += `${product.id}@`;
  //   }
  //   cookies.set("whishList", savedProducts, { expires: 100 });
  //   setLikedProducts(savedProducts.split("@"));
  // fetch("/api/whishList/add_remove", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   }
  //   ,
  //   body: JSON.stringify({ id: product.id }),
  // });
  // };
  // console.log(
  //   "likedProducts==>",
  //   likedProducts,
  //   likedProducts.includes(`${product.id}`)
  // );
  const cleanUp = (e) => {
    setAddToCart(false);
    // console.log(product);
    // setActiveLink(e.currentTarget.getAttribute("url"));
  };
  const check = () => {
    let sizeValue = sizeRef.current.value;
    let colorValue = colorRef.current.value;
    if (sizeValue && colorValue) {
      console.log("done");
      addToCart(product.id, sizeValue, colorValue);
      setAddToCart(false);
    }
  };
  let component = "";
  if (addToCartA) {
    component = (
      <div>
        <div className={classes.sizeContainer}>
          <label htmlFor="size">Size</label>
          <select onChange={check} id="size" ref={sizeRef}>
            <option value="" selected disabled hidden>
              select...
            </option>
            {product.availableSizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.sizeContainer}>
          <label htmlFor="color">Color</label>
          <select onChange={check} id="color" ref={colorRef}>
            <option value="" selected disabled hidden>
              select...
            </option>{" "}
            {Object.keys(product.colors).map((c) => (
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
          setAddToCart(true);
        }}
      >
        ADD TO CART
      </span>
    );
  }
  return (
    <div onMouseLeave={cleanUp} className={classes.test}>
      <div className={classes.test2}>
        <ProductImage colors={product.colors} />
        <div
          // onClick={addToCart.bind(null, product.id)}
          className={classes.addtocart}
        >
          {component}
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
        {product.sale.available && (
          <div className={classes.sale}>{product.sale.pecent}% off</div>
        )}
      </div>
      <div className={classes.info}>
        <div className={classes.price}>{product.price}$</div>
        <div className={classes.details}>{product.name}</div>
      </div>
    </div>
  );
}
