import toCartList from "../../../utils/toCartList";
import getLikdProductsFromCookies from "../../../utils/getLikdProductsFromCookies";
import authMiddleware from "../../../middleware/authMiddleware";
import { db } from "../../../firebaseAdminConfig";

async function handler(req, res) {
  let whishList = [];
  if (req.userId) {
    whishList = await db.collection("whishList").doc(req.userId).get();

    if (whishList.exists) {
      whishList = await whishList.data().whishList;
    } else {
      whishList = [];
    }
  } else {
    whishList = getLikdProductsFromCookies(req, res);
  }
  res.status(200).json(whishList);
}
export default authMiddleware(handler);
