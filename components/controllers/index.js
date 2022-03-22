import Link from "next/link";
import { useContext } from "react";
import myStoreContext from "../../store/storeContext";
import classes from "./controllers.module.css";
import WishList from "../whishlist";
import CartList from "../cartList";
import { RiUser3Fill, RiUser3Line } from "react-icons/ri";
export default function Controllers() {
  const { user } = useContext(myStoreContext);
  return (
    <div className={classes.controllers}>
      <div className={classes.user}>
        <Link href="/myOrders">
          <a>
            {user ? (
              <RiUser3Fill className={classes.userIcon} />
            ) : (
              <RiUser3Line className={classes.userIcon} />
            )}
          </a>
        </Link>
        <div>{user}</div>
      </div>

      <WishList />
      <CartList />
    </div>
  );
}
