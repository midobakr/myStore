import {
  collection,
  doc,
  where,
  getDocs,
  setDoc,
  getDoc,
  query,
} from "firebase/firestore";
import { app, database } from "../../../firebaseConfig";

import Cookies from "cookies";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const keys = ["opscjedcoij", ";oeroerer;"];

export default async function handler(req, res) {
  const cook = new Cookies(req, res, { keys });
  // const arr = cook.get("whishList", { signed: true });
  const arr = cook.get("whishList", { signed: true })?.split("@") || [];
  let products = [];
  if (arr[0]) {
    const q = query(collection(database, "products"), where("id", "in", arr));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });
  }

  console.log("====================================");
  console.log(arr);
  console.log("------------------------------------");
  res.status(200).json(products);
}

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
