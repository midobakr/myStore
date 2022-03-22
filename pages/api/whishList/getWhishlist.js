import { db } from "../../../firebaseAdminConfig";
import getLikdProductsFromCookies from "../../../utils/getLikdProductsFromCookies";
import authMiddleware from "../../../middleware/authMiddleware";

async function handler(req, res) {
  let whishList = [];
  if (req.userId) {
    let whishListRec = await db.collection("whishList").doc(req.userId).get();
    whishList = (await whishListRec.data()?.whishList) || [];
  } else {
    whishList = getLikdProductsFromCookies(req, res);
  }
  let products = [];
  if (whishList[0]) {
    const productsRef = db.collection("products");
    const snapshot = await productsRef.where("id", "in", whishList).get();
    snapshot.forEach((doc) => {
      products.push(doc.data());
    });
  }

  console.log("====================================");
  console.log(req.userId);
  console.log(whishList);
  console.log("------------------------------------");
  res.status(200).json(products);
}
export default authMiddleware(handler);
