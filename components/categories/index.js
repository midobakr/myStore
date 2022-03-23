import Link from "next/link";
import classes from "./categories.module.css";
import { BsPercent } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { GiClothes, GiBallerinaShoes } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
export default function Categories({ closeCart, category }) {
  return (
    <div className={classes.categories}>
      <ul className={classes.categories_list}>
        <li>
          <span className={classes.icon}>
            <BsPercent />
          </span>
          <Link href="/sale">
            <a
              style={"sale" === category ? { color: "#a90a3f" } : {}}
              onClick={closeCart}
            >
              SALE
            </a>
          </Link>
        </li>
        <li>
          <span className={classes.icon}>
            <AiOutlineFire />
          </span>
          <Link href="/new">
            <a
              style={"new" === category ? { color: "#a90a3f" } : {}}
              onClick={closeCart}
            >
              NEW
            </a>
          </Link>
        </li>
        <li>
          <span className={classes.icon}>
            <GiClothes />
          </span>
          <Link href="/clothes">
            <a
              style={"clothes" === category ? { color: "#a90a3f" } : {}}
              onClick={closeCart}
            >
              CLOTHES
            </a>
          </Link>
        </li>
        <li>
          <span className={classes.icon}>
            <GiBallerinaShoes />
          </span>
          <Link href="/shoes">
            <a
              style={"shoes" === category ? { color: "#a90a3f" } : {}}
              onClick={closeCart}
            >
              SHOES
            </a>
          </Link>
        </li>
        <li>
          <span className={classes.icon}>
            <IoBag />
          </span>
          <Link href="/bag">
            <a
              style={"bag" === category ? { color: "#a90a3f" } : {}}
              onClick={closeCart}
            >
              BAGS
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
