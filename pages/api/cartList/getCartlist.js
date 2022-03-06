import toCartList from "../../../utils/toCartList";
import getCartFromCookie from "../../../utils/getCartFromCookie";
import authMiddleware from "../../../middleware/authMiddleware";
import { db } from "../../../firebaseAdminConfig";

async function handler(req, res) {
  let myCart = [];
  if (req.userId) {
    myCart = await db.collection("carts").doc(req.userId).get();
    if (myCart) {
      myCart = await myCart.data();
      // console.log(f);
    }
    console.log(req.userId);
    res.status(200).json(myCart);
    return true;
  } else {
    const cartListItems = getCartFromCookie(req, res);
    myCart = await toCartList(cartListItems);

    res.status(200).json({ cart: myCart });
  }
}
// export default handler;
export default authMiddleware(handler);
// const new_doc = doc(collection(database, "products"));
// console.log(new_doc.id);
// setDoc(new_doc, {
//   id: new_doc.id,
//   name: "KAVA Kava Womens Boy Friend",
//   brand: "KAVA",
//   type: "AVA Kava Womens Boy Friend",
//   description:
//     "The Long Coat is sold by YOXO. This product comes in Black and has a Plainstyle. If you are looking for Coats , then this item from YOXO is for you.",

//   colors: {
//     hazle: [
//       "https://assets.brantu.com/product/p4364424/1000x1500/kava-womens-boy-friend-1630498480313-3.jpeg",
//     ],
//     pink: [
//       "https://assets.brantu.com/product/p4364424/1000x1500/kava-womens-boy-friend-1630492248675-3.jpeg",
//     ],
//   },
//   price: 229,
//   sale: {
//     available: false,
//     pecent: 5,
//   },
//   availableSizes: ["s", "m"],

//   specifications: {
//     Product_id: new_doc.id,
//     Material: "Wool",
//     Pattern: "Plain",
//   },
// });
