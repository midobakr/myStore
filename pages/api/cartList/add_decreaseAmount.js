import Cookies from "cookies";
import getCartFromCookie from "../../../utils/getCartFromCookie";
import toCartList from "../../../utils/toCartList";
import { db } from "../../../firebaseAdminConfig";
import authMiddleware from "../../../middleware/authMiddleware";
import calculateTotalPrice from "../../../utils/calculateTotalPrice";
const keys = ["opscjedcoij", ";oeroerer;"];

async function handler(req, res) {
  req.body = JSON.parse(req.body);
  let newProduct = {
    details: {
      id: req.body.id,
      size: req.body.size,
      color: req.body.color,
    },
    amount: +req.body.amount,
  };

  const cookies = new Cookies(req, res, { keys });
  let oldCartList = [];
  if (req.userId) {
    oldCartList = await db.collection("carts").doc(req.userId).get();
    oldCartList = oldCartList.data().cart;
  } else {
    oldCartList = getCartFromCookie(req, res);
    oldCartList = await toCartList(oldCartList);
  }

  let newCartList = await addORremove(oldCartList, newProduct);
  const totalPrice = calculateTotalPrice(newCartList);

  if (req.userId) {
    let res = await db.collection("carts").doc(req.userId).set({
      id: req.userId,
      cart: newCartList,
      totalPrice,
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

const addORremove = async (cartList, newProduct) => {
  cartList = cartList.map((product) => {
    if (
      JSON.stringify(sortObject(product.details)) ===
      JSON.stringify(sortObject(newProduct.details))
    ) {
      product.quantity += newProduct.amount;
      product.totalPrice = product.quantity * product.unitPrice;
    }
    return product;
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
