import { db } from "../../../firebaseAdminConfig";
import authMiddleware from "../../../middleware/authMiddleware";

async function handler(req, res) {
  req.body = JSON.parse(req.body);

  let oldCartList = await db.collection("carts").doc(req.userId).get();
  oldCartList = oldCartList.data();

  let orderDoc = await db.collection("orders").doc();

  let result = await orderDoc.set({
    id: orderDoc.id,
    userId: req.userId,
    products: oldCartList,
    shippingDetails: req.body.address,
    payment: req.body.payment,
    date: +new Date(),
    status: "processing",
  });
  console.log(result);
  await db.collection("carts").doc(req.userId).set({
    id: req.userId,
    cart: [],
    totalPrice: 0,
  });
  res.status(200).json({ orderId: orderDoc.id });
}
export default authMiddleware(handler);
