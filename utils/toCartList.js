import { db } from "../firebaseAdminConfig";
export default async function toCartList(cartList) {
  if (!cartList[0]) {
    return [];
  }
  let cartlistIDs = cartList.map((product) => product.details.id);
  const productsRef = db.collection("products");
  const snapshot = await productsRef.where("id", "in", cartlistIDs).get();
  let products = [];
  snapshot.forEach((doc) => {
    products.push(doc.data());
  });
  cartList = cartList.map((cartItem) => {
    let product = products.find((p) => p.id === cartItem.details.id);
    return {
      ...cartItem,
      name: product.name,
      unitPrice: product.salePrice,
      totalPrice: product.price * cartItem.quantity,
      image: product.images[cartItem.details.color][0],
    };
  });

  return cartList;
}
