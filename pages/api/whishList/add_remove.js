import Cookies from "cookies";
const keys = ["opscjedcoij", ";oeroerer;"];
import authMiddleware from "../../../middleware/authMiddleware";
import getLikdProductsFromCookies from "../../../utils/getLikdProductsFromCookies";
import { db } from "../../../firebaseAdminConfig";
async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400);
    return false;
  }
  const productId = req.body.id;
  let whishList = [];
  if (req.userId) {
    whishList = await db.collection("whishList").doc(req.userId).get();
    whishList = (await whishList.data()?.whishList) || [];
  } else {
    whishList = getLikdProductsFromCookies(req, res);
  }

  if (whishList.includes(productId)) {
    whishList = whishList.filter((item) => item != productId);
  } else {
    whishList.push(productId);
  }
  console.log(req.userId, "done");
  if (req.userId) {
    console.log(whishList);
    await db.collection("whishList").doc(req.userId).set({ whishList });
  } else {
    const cookies = new Cookies(req, res, { keys });

    cookies.set("whishList", JSON.stringify(whishList), {
      signed: true,
      maxAge: 100 * 24 * 60 * 60 * 1000,
    });
  }
  res.status(200).json(whishList);
}
export default authMiddleware(handler);
