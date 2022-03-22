import { db } from "../../../firebaseAdminConfig";

async function handler(req, res) {
  const { keywords } = req.query;
  const keywordsArray = keywords.split(" ");
  console.log("keywords=", keywordsArray);
  let productsRef = await db
    .collection("products")
    .where("keywords", "array-contains-any", keywordsArray);

  const querySnapshot = await productsRef.limit(10).get();
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  console.log("search=", products);
  res.status(200).json({ products: products });
}
export default handler;
