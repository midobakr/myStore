import toCartList from "../../../utils/toCartList";
import getCartFromCookie from "../../../utils/getCartFromCookie";
import authMiddleware from "../../../middleware/authMiddleware";
import { db } from "../../../firebaseAdminConfig";

async function handler(req, res) {
  let myCart = [];
  if (req.userId) {
    myCart = await db.collection("carts").doc(req.userId).get();
    if (myCart) {
      myCart = await myCart.data();
    }
    res.status(200).json(myCart);
    return true;
  } else {
    const cartListItems = getCartFromCookie(req, res);
    myCart = await toCartList(cartListItems);

    res.status(200).json({ cart: myCart });
  }
}

export default authMiddleware(handler);
