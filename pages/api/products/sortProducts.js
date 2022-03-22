import { db } from "../../../firebaseAdminConfig";

async function handler(req, res) {
  const { PRICE, COLOR } = req.query;
  let productsRef = await db.collection("products");
  if (PRICE) {
    switch (PRICE) {
      case "Most Expensive":
        productsRef = productsRef.orderBy("salePrice", "desc");
        break;
      case "Less Expensive":
        productsRef = productsRef.orderBy("salePrice", "asc");
        break;
    }
  }
  if (COLOR) {
    productsRef = productsRef.where("colors", "array-contains", COLOR);
  }
  const querySnapshot = await productsRef.get();
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  res.status(200).json({ products: products });
}
export default handler;
