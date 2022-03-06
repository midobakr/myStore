import admin from "firebase-admin";
import {
  initializeApp,
  cert,
  applicationDefault,
  getApps,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const credintials = require("./mystore-a0c0b-firebase-adminsdk-phxfm-f2481fa09b.json");
if (admin.apps.length === 0) {
  initializeApp({ credential: cert(credintials) });
}

const db = getFirestore();
const auth = getAuth();

module.exports = { db, auth };
// const app = initializeApp(credintials, "ssaax");
// const db = getFirestore(app);
// console.log("aaaaaaaa", admin.apps.length);
//   export { app };
// }
// console.log("kkkk", app);
// export const database = getFirestore(app);
// export default admin;
// export const databse = admin.firestore();
// firebase.initializeApp(
//   {
//     credential: firebase.credential.cert(credintials),
//   },
//   "adminsp"
// );

// module.exports = app;
// export default app;
