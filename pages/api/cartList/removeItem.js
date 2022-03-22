import Cookies from "cookies";
import getCartFromCookie from "../../../utils/getCartFromCookie";
import { db } from "../../../firebaseAdminConfig";
import authMiddleware from "../../../middleware/authMiddleware";
const keys = ["opscjedcoij", ";oeroerer;"];

async function handler(req, res) {
  req.body = JSON.parse(req.body);
  let theProduct = {
    details: {
      id: req.body.id,
      size: req.body.size,
      color: req.body.color,
    },
  };

  const cookies = new Cookies(req, res, { keys });
  let oldCartList = [];
  if (req.userId) {
    oldCartList = await db.collection("carts").doc(req.userId).get();
    oldCartList = oldCartList.data().cart;
  } else {
    oldCartList = getCartFromCookie(req, res);
  }

  let newCartList = await remove(oldCartList, theProduct);
  if (req.userId) {
    let res = await db.collection("carts").doc(req.userId).set({
      id: req.userId,
      cart: newCartList,
    });
  } else {
    cookies.set("cartList", JSON.stringify(newCartList), {
      signed: true,
      maxAge: 100 * 24 * 60 * 60 * 1000,
    });
  }
  res.status(200).json({ cart: newCartList });
}
export default authMiddleware(handler);

const remove = async (cartList, theProduct) => {
  cartList = cartList.filter((product) => {
    if (
      JSON.stringify(sortObject(product.details)) ===
      JSON.stringify(sortObject(theProduct.details))
    ) {
      return false;
    }
    return true;
  });

  return cartList;
};
const sortObject = (obj) => {
  let tmp = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      tmp = { ...tmp, [key]: obj[key] };
    });
  return tmp;
};
