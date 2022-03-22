import { db } from "../../../firebaseAdminConfig";
import authMiddleware from "../../../middleware/authMiddleware";

async function handler(req, res) {
  let ordersSnapshot = await db
    .collection("orders")
    .where("userId", "==", req.userId)
    .get();

  let orders = [];
  ordersSnapshot.forEach((doc) => {
    orders.push(doc.data());
  });
  res.status(200).json(orders);
}
export default authMiddleware(handler);
