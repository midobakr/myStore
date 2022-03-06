import { db } from "../../../firebaseAdminConfig";
import getCartFromCookie from "../../../utils/getCartFromCookie";
import toCartList from "../../../utils/toCartList";
import authMiddleware from "../../../middleware/authMiddleware";
async function setCartlist(req, res) {
  const userId = req.userId;
  const userCartDocRef = db.collection("carts").doc(userId);
  const userCartDoc = await userCartDocRef.get();
  const userCartCookie = getCartFromCookie(req, res);
  if (userCartCookie && !userCartDoc.exists) {
    const userCartlist = await toCartList(userCartCookie);
    userCartDocRef.set({
      userId,
      cart: userCartlist,
    });
  }
  res.status(200).json({ s: "s" });
}
export default authMiddleware(setCartlist);
