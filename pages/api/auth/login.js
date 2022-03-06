import { auth } from "../../../firebaseAdminConfig";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
// import {ver} from "firebase-admin/auth";
// import admin from "../../../firebaseAdminConfig";

export default async function handler(req, res) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const user = await auth.verifyIdToken(token);
    } catch (e) {
      res.status(400).json({ e: "invalid" });
      return;
    }
  }

  res.status(200).json({ result: 22 });
}
