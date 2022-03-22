import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

import ProductDetails from "../../components/productDetails";
import { db } from "../../firebaseAdminConfig";

import classes from "./productId.module.css";

export default function Product({ product }) {
  // const productImages =
  //"https://assets.brantu.com/product/p4364424/1000x1500/kava-womens-boy-friend-1630498480313-3.jpeg",
  const [images, setImages] = useState(Object.values(product.images).flat());
  const [active, setActive] = useState(1);
  const [pointer, setPointer] = useState(0);
  const sliderRef = useRef();
  useEffect(() => {
    const slider = sliderRef.current;
    slider.scroll({
      top: 0,
      left: pointer,
      behavior: "smooth",
    });
  }, [pointer, product]);
  const next = () => {
    const sliderWidth = sliderRef.current.offsetWidth;
    const sliderScrollWidth = sliderRef.current.scrollWidth;
    const sliderScrollRight = sliderRef.current.scrollLeft + sliderWidth;

    if (active >= images.length) {
      setPointer(0);
      setActive(1);
    } else {
      setActive((i) => i + 1);
      setPointer((i) => i + 400);
    }
  };
  const prev = () => {
    if (active == 1) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const sliderScrollWidth = sliderRef.current.scrollWidth;

      setPointer(sliderScrollWidth - sliderWidth);
      setActive(images.length);
    } else {
      setActive((i) => i - 1);
      setPointer((i) => i - 400);
    }
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.name}>{product.name}</h1>
      <div className={classes.container2}>
        <div className={classes.relativeContainer}>
          <div className={classes.left} onClick={prev}>
            <AiFillLeftCircle />
          </div>
          <div className={classes.right} onClick={next}>
            <AiFillRightCircle />
          </div>
          <div className={classes.navihators}>
            {images.map((img, i) => (
              <div
                key={i}
                className={classes.circle}
                style={
                  i + 1 === active ? { backgroundColor: "rgba(0,0,0)" } : {}
                }
              ></div>
            ))}
          </div>
          <div className={classes.imageContainer} ref={sliderRef}>
            {images.map((img, i) => (
              <div key={i} className={classes.Image}>
                <Image src={img} alt="Vercel Logo" width={400} height={550} />
              </div>
            ))}
          </div>
        </div>

        {/* <div className={classes.detailsContainer}></div> */}
        <ProductDetails product={product} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const productId = context.query.id;
  let product = await db.collection("products").doc(productId).get();
  if (product.exists) {
    product = await product.data();
  }
  return { props: { product: product } };
}
