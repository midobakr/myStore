import { AiFillHeart } from "react-icons/ai";
import classes from "./index.module.css";
import { useEffect, useState } from "react";
export default function Home() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return <h1>{width}</h1>;
  return (
    <div className={classes.container}>
      <div className={classes.test}>
        <div className={classes.test2}>
          <img
            className={classes.image}
            src="https://assets.brantu.com/product/6513684-512359/1000x1500/1637225703214-6513684-512359-0-3.jpeg"
            alt="Vercel Logo"
            height={300}
          />
          <span style={{ float: "right" }}>
            <AiFillHeart className={classes.icon} />
          </span>
          <div className={classes.sale}>15% off</div>
        </div>
        <div className={classes.info}>
          <div className={classes.price}>333$</div>
          <div className={classes.details}> long coat</div>
        </div>
      </div>
    </div>
  );
}
