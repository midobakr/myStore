import { useEffect } from "react";
import { useRouter } from "next/router";
import { AiFillLike } from "react-icons/ai";
import classes from "./succefullOrder.module.css";

export default function SuccefullOrder() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/myOrders");
      console.log("done");
    }, 5000);
  }, [router]);
  return (
    <div className={classes.container}>
      <h1 className={classes.statment}>Your Order has been added succefully</h1>
      <h1 className={classes.like}>
        <AiFillLike />
      </h1>
    </div>
  );
}
