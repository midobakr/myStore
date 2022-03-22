import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const credintials = require("./mystore-a0c0b-firebase-adminsdk-phxfm-f2481fa09b.json");
if (admin.apps.length === 0) {
  initializeApp({ credential: cert(credintials) });
}

const db = getFirestore();
const auth = getAuth();

module.exports = { db, auth };
