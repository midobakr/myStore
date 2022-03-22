import { db } from "../../../firebaseAdminConfig";

async function handler(req, res) {
  const { category } = req.query;
  let querySnapshot = "";
  if (category === "sale") {
    querySnapshot = await db
      .collection("products")
      .where("sale", "==", "true")
      .get();
  } else if (category === "new") {
    querySnapshot = await db
      .collection("products")
      .orderBy("lastEditDate", "desc")
      .get();
  } else {
    querySnapshot = await db
      .collection("products")
      .where("keywords", "array-contains", category)
      .get();
  }

  let products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  res.status(200).json({ products: products });
}
export default handler;
