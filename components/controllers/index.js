import Link from "next/link";

import classes from "./controllers.module.css";
import WishList from "../whishlist";
import CartList from "../cartList";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
export default function Controllers() {
  return (
    <div className={classes.controllers}>
      <Link href="/myOrders">
        <a>
          <AiOutlineUser className={classes.userIcon} />
        </a>
      </Link>
      <WishList />
      <CartList />
    </div>
  );
}
