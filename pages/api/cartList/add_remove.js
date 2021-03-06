import Cookies from "cookies";
import getCartFromCookie from "../../../utils/getCartFromCookie";
import toCartList from "../../../utils/toCartList";
import { db } from "../../../firebaseAdminConfig";
import authMiddleware from "../../../middleware/authMiddleware";
import calculateTotalPrice from "../../../utils/calculateTotalPrice";
const keys = ["opscjedcoij", ";oeroerer;"];

async function handler(req, res) {
  let newProduct = {
    details: {
      id: req.body.id,
      size: req.body.size,
      color: req.body.color,
    },
    quantity: 1,
  };
  const cookies = new Cookies(req, res, { keys });
  let oldCartList = [];
  if (req.userId) {
    oldCartList = await db.collection("carts").doc(req.userId).get();
    oldCartList = oldCartList.data()?.cart || [];
  } else {
    oldCartList = getCartFromCookie(req, res);
  }

  let newCartList = await addProductToCart(oldCartList, newProduct, req);
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
  res.status(200).json(newCartList);
}
export default authMiddleware(handler);
const addProductToCart = async (cartList, newProduct, req) => {
  let wasThere = false;

  if (cartList[0]) {
    cartList = cartList.map((product) => {
      if (
        JSON.stringify(sortObject(product.details)) ===
        JSON.stringify(sortObject(newProduct.details))
      ) {
        wasThere = true;
        product.quantity += 1;
        product.totalPrice = product.quantity * product.unitPrice;
      }
      return product;
    });
    if (!wasThere) {
      if (req.userId) {
        const tmp = await toCartList([newProduct]);
        cartList.push(tmp[0]);
      } else {
        cartList.push(newProduct);
      }
    }
  } else {
    const tmp = await toCartList([newProduct]);
    cartList = [tmp[0]];
  }
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
