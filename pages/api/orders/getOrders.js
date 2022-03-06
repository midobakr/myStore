import { db } from "../../../firebaseAdminConfig";
import authMiddleware from "../../../middleware/authMiddleware";

async function handler(req, res) {
  let ordersSnapshot = await db
    .collection("orders")
    .where("userId", "==", req.userId)
    .get();

  let orders = [];
  console.log("bb", ordersSnapshot.empty);
  ordersSnapshot.forEach((doc) => {
    console.log("p=", doc);
    orders.push(doc.data());
  });
  console.log("myOrders", orders, req.userId);
  res.status(200).json(orders);
}
export default authMiddleware(handler);
