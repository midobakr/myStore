import { db } from "../../../firebaseAdminConfig";
import getCartFromCookie from "../../../utils/getCartFromCookie";
import toCartList from "../../../utils/toCartList";
import calculateTotalPrice from "../../../utils/calculateTotalPrice";
import authMiddleware from "../../../middleware/authMiddleware";
async function setCartlist(req, res) {
  const userId = req.userId;
  const userCartDocRef = db.collection("carts").doc(userId);
  const userCartDoc = await userCartDocRef.get();
  const userCartCookie = getCartFromCookie(req, res);
  if (userCartCookie && !userCartDoc.exists) {
    const userCartlist = await toCartList(userCartCookie);
    const totalPrice = calculateTotalPrice(userCartlist);

    userCartDocRef.set({
      userId,
      cart: userCartlist,
      totalPrice,
    });
  }
  res.status(200).json({ s: "s" });
}
export default authMiddleware(setCartlist);
