import Link from "next/link";
import classes from "./index.module.css";

export default function Home() {
  return (
    <div className={classes.container}>
      <div className={classes.clothes}>
        <Link href={"/clothes"}>
          <a>CLOTHES</a>
        </Link>
      </div>
      <div className={classes.sale}>
        <Link href={"/sale"}>
          <a> SALE </a>
        </Link>
      </div>
      <div className={classes.bags}>
        <Link href={"/bags"}>
          <a>BAGS </a>
        </Link>
      </div>
      <div className={classes.shoes}>
        <Link href={"/shoes"}>
          <a>SHOES </a>
        </Link>
      </div>
    </div>
  );
}
